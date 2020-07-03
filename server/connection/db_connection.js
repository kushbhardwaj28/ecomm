//@ts-check

import mysql from 'mysql';
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123qwe',
    database: 'new_db',
    port: 3306,
});

connection.connect((err) => {
    if (err) throw err;
});

export default connection;