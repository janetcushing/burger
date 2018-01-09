var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "burgers_db"
    });
};

    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log("I have successfully connected to the burgers_db");
        console.log("connected as id " + connection.threadId);
        // console.log("-----------------------------------------");
        // console.log(" ");
        // console.log("  Thank you for eating at Eat-Da-Burger!!");
        // console.log(" ");
        // console.log("-----------------------------------------");
        // connection.end();
    });

    module.exports = connection;