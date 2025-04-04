const express = require('express');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const users = {
    abc: {
        id: "abc",
        email: "a@a.com",
        password: "$2a$10$80qaojo1Ru62verGf0H0KO0MD8tQyI6Ep0e8qUtqrS7xjTWdjk8.q",
    },
    def: {
        id: "def",
        email: "b@b.com",
        password: "$2a$10$80qaojo1Ru62verGf0H0KO0MD8tQyI6Ep0e8qUtqrS7xjTWdjk8.q",
    },
};

const app = express();
const port = 8000;

// configuration
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
// app.use(cookieParser()); // populates req.cookies
app.use(
    cookieSession({
        name: 'my-session',
        keys: ["abcd"], // kept secret
    })
)
app.use(express.urlencoded({ extended: false })); // populates req.body

// GET /register
app.get('/register', (req, res) => {
    res.render('register');
});

// POST /register
app.post('/register', (req, res) => {
    // pull the info off the body object
    const email = req.body.email;
    const password = req.body.password;

    // did we NOT receive an email and/or password
    if (!email || !password) {
        return res.status(400).send('Please provide an email AND a password');
    }

    // look through existing users to see if one already has the email provided
    let foundUser = null;

    for (const userId in users) {
        const user = users[userId];
        if (user.email === email) {
            // we found a duplicate email
            foundUser = user;
        }
    }

    // did we find an existing user with that email?
    if (foundUser) {
        return res.status(400).send('a user with that email already exists');
    }

    // happy path! we can create the new user object
    const id = Math.random().toString(36).substring(2, 5);
    const hash = bcrypt.hashSync(password, 10);
    const newUser = {
        id: id,
        email: email,
        password: hash,
    };

    // add the new user to the users object
    users[id] = newUser;
    console.log(users);

    // redirect to the login page
    res.redirect('/login');
});

// GET /login
app.get('/login', (req, res) => {
    res.render('login');
});

// POST /login
app.post('/login', (req, res) => {
    // console.log(req.body);

    // pull the info off the body object
    const email = req.body.email;
    const password = req.body.password;

    // did we NOT receive an email and/or password
    if (!email || !password) {
        return res.status(400).send('Please provide an email AND a password');
    }

    // lookup the user based off the email provided
    let foundUser = null;

    for (const userId in users) {
        const user = users[userId];
        if (user.email === email) {
            // we found our user!!!
            foundUser = user;
        }
    }

    // did we NOT find a user
    if (!foundUser) {
        return res.status(400).send('no user with that email found');
    }

    // does the provided password NOT match the one from the database
    if (!bcrypt.compareSync(password, foundUser.password)) {
        // if (foundUser.password !== password) {
        return res.status(400).send('passwords do not match');
    }

    // happy path! The user is who they say they are!
    // set a cookie and redirect the user
    // res.cookie('userId', foundUser.id);
    req.session.userId = foundUser.id;

    res.redirect('/protected');
});

// GET /protected
app.get('/protected', (req, res) => {
    // do they have a cookie?
    // const userId = req.cookies.userId;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('you must be logged in to see this page');
    }

    // lookup the user based off their cookie
    const user = users[userId];

    const templateVars = {
        user: user
    };

    // render the protected template
    res.render('protected', templateVars);
});

// POST /logout
app.post('/logout', (req, res) => {
    // clear the userId cookie
    res.clearCookie('userId');

    // redirect the user
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
