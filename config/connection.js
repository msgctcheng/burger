//MYSQL CONNECTION
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db",
    PORT: 3306
});

connection.connect( function(err) {
    if (err) {
        console.log("Connection Error: " + err.stack);
        return;
    }
    console.log("Connected as id: "+ connection.threadId);
});

module.exports = connection;