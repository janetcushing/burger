var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burger_db"
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("I have successfully connected to the burger_db");
//     // runSearch();
//     console.log("-----------------------------------------");
//     console.log(" ");
//     console.log("  Thank you for eating at Eat-Da-Burger!!");
//     console.log(" ");
//     console.log("-----------------------------------------");
//     connection.end();
// });

module.export = connection;