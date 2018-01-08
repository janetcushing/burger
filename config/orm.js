/*
   * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

     * `selectAll()` 
     * `insertOne()` 
     * `updateOne()` 

   * Export the ORM object in `module.exports`.
*/

// Dependencies
// =============================================================
var connection = require("./connection.js");

// ORM
// =============================================================

var tableName = "burgers_t";

var orm = {
  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the callback to ensure that data is returned only once the query is done.
  // uneatenBurgers: function (callback) {
  //   var uneaten = "SELECT * FROM burgers_t WHERE devoured IS false ORDER BY id";
  //   connection.query(function (err, result) {
  //     callback(result);
  //   });
  // },

  // eatenBurgers: function (callback) {
  //   var eaten = "SELECT * FROM burgers_t WHERE devoured IS true ORDER BY id";
  //   connection.query(function (err, result) {
  //     callback(result);
  //   });
  // },
  selectAll: function (callback) {
    var all = "SELECT * FROM burgers_t ORDER BY devoured, id";
    connection.query(all, function (err, result) {
      console.log("in selectAll");
      console.log(result);  

      callback(result);
    });
  },


  // Here our ORM is creating a simple method for adding characters to the database
  // Effectively, the ORM's simple addCharacter method translates into a more complex SQL INSERT statement.
  insertOne: function (burger, callback) {
    var addQuery = "INSERT INTO burgers_t (burger_name) VALUES (?)";
    connection.query(addQuery, [burger.burger_name], function (err,result) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      callback(result, err);
    });
  },

  updateOne: function (burgerId, callback) {
    console.log("burgerid " + burgerId);
    var updateQuery = "UPDATE burgers_t SET devoured = true WHERE id = " + burgerId;
    connection.query(updateQuery, function (
      err,
      result
    ) {
      callback(result,err);
    });
  }
};

module.exports = orm;