// const pg = require('pg');
// Pool pools connections together, manages it so that we don't waste connections
const { Pool } = require('pg');

const config = {
    user: 'dtran',
    password: 'password',
    database: 'movies',
    host: 'localhost',
};

const pool = new Pool(config);


// Get all villains
const getAllVillains = () => {
    pool.query('SELECT * FROM movie_villains ORDER BY id ASC')
        .then((res) => {
            console.log(res.rows);
        })
        .catch(err => {
            console.log(err);
        })
}

getAllVillains();

// Get one villain by id
const getVillainById = (id) => {
    pool.query(`SELECT * FROM movie_villains WHERE id = ${id}`)
        .then((res) => {
            console.log(res.rows);
        })
        .catch(err => {
            console.log(err);
        })
}

getVillainById(2);
// Insert a new villain
// prepared statement
const addVillain = (villain, movie) => {
    pool.query('INSERT INTO movie_villains (villain, movie) VALUES ($1, $2)', [villain, movie])
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

}
addVillain("Darth Vader", "The Empire Strikes Back");
// Edit a villain

// Delete a villain