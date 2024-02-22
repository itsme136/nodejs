const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: 'k12345',
    host: 'localhost',
    port: 5432,
    database: 'dostapp'
});

module.exports = pool;
