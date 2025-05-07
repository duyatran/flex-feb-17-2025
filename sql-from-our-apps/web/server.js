const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes/villains.js");

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// localhost/villains
app.use("/villains", router);
// app.use("/users", router);
// app.use("/movies", router);

app.listen(3000, () => {
    console.log("app is on port 3000");
})
