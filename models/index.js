const mysql = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + '/config/config.json')[env];
console.log(env);
console.log(config);

const pool = mysql.createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    waitForConnections : true,
    connectionLimit: 10,
    enableKeepAlive : true,
    keepAliveInitialDelay : 0,
}).promise();

module.exports = pool;