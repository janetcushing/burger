
// =============================================================
// Dependencies
// =============================================================
var connection = require("./connection.js");

// =============================================================
// ORM
// =============================================================

var orm = {

// =============================================================
// select all the rows in the table 
// =============================================================
  selectAll: function (callback) {
    var allQuery = "SELECT * FROM burgers_t ORDER BY devoured, id";
    connection.query(allQuery, function (err, result) {
      console.log("in selectAll");
      console.log(result);  
      callback(result);
    });
  },


// =============================================================
// insert one new row into the table
// =============================================================
  insertOne: function (burger, callback) {
    var addQuery = "INSERT INTO burgers_t (burger_name) VALUES (?)";
    console.log(addQuery);
    console.log(burger);
    connection.query(addQuery, [burger], function (err,result) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      callback(result, err);
    });
  },

// =============================================================
// update one row in the table
// =============================================================
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

// =============================================================
// export
// =============================================================
module.exports = orm;