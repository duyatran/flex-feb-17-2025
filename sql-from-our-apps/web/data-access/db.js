// Handles db connections
const { Pool } = require('pg');

// EXERCISE: refactor this to use environment variables with dotenv, see https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
const config = {
    user: 'dtran',
    password: 'password',
    database: 'movies',
    host: 'localhost',
    port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
