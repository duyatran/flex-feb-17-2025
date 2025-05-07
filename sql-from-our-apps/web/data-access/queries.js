const db = require("./db"); // pool object from db.js

module.exports = {

    // browse
    getVillains: () => {
        return db.query('SELECT * FROM movie_villains ORDER BY id ASC')
            .then(data => data.rows)
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    // read
    getVillainById: (id) => {
        return db.query('SELECT * FROM movie_villains WHERE id = $1', [id])
            .then(data => data.rows)
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    // edit
    updateVillain: (id, newName) => {
        return db.query('UPDATE movie_villains SET villain = $1 WHERE id = $2', [newName, id])
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    // add
    createVillain: (villain, movie) => {
        return db.query('INSERT INTO movie_villains (villain, movie) VALUES ($1, $2)', [villain, movie])
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    // delete
    deleteVillain: (id) => {
        return db.query('DELETE FROM movie_villains WHERE id = $1', [id])
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

};
