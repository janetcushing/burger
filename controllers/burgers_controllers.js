// *********************************************************************************
// burgers_controllers.js - this file offers a set of routes for displaying
// and saving data to the db
// *********************************************************************************

// =============================================================
// Dependencies
// =============================================================
var orm = require("../config/orm.js");

// =============================================================
// Routes
// =============================================================
module.exports = function (app) {

    app.get("/", function (req, res) {
  // Display the JSON for the  burgers
  console.log(" get /");
  orm.selectAll(function (data) {
    console.log(data);
    var uneaten = [];
    var eaten = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].devoured) {
        eaten.push(data[i])
      } else {
        uneaten.push(data[i])
      }
    }
    res.render("index", {uneatenBurger: uneaten, eatenBurger: eaten});
  });
});

    app.get("/index", function (req, res) {
        // Display the JSON for the burgers
        console.log(" get /index");
        orm.selectAll(function (data) {
            console.log("data ");
            console.log(data);
            var uneaten = [];
            var eaten = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].devoured) {
                    eaten.push(data[i])
                } else {
                    uneaten.push(data[i])
                }
                res.render("index", {uneatenBurger: uneaten, eatenBurger: eaten});
            }
        });
    });


    // add a new burger
    app.post("/index", function (req, res) {
        console.log("im adding a new burgerxxx");
        var newBurger = req.body.burger_name;
        console.log("newBurgerxxx: " + newBurger);
        // console.log("burgerName: " + burgerName);
        // insert a new row in the database
        orm.insertOne(newBurger, function (data, err) {
            if (err){
                console.log("hit an error:");
                console.log(err);
                return res.status(500).end();
            }
            console.log("inserted the burger");
            res.status(200).end();
        });

    });

    // update the devoured status
    app.put("/api/devoured/:id", function (req, res) {
        console.log("im devouring a burger");
        // update the DB.
        var burgerId = req.params.id;
        console.log("id " + burgerId);
        orm.updateOne(burgerId, function (data, err) {
            if (err) {
                // If an error occurred, send a generic server faliure
                console.log(err);
                return res.status(500).end();
            } else if (data.changedRows == 0) {
                console.log(data);
                // If no rows were changed, then the ID must not exist, so 404
                console.log("burger row did not get updated");
                return res.status(404).end();
            } else {
                console.log("updated the burger");
                res.status(200).end();
            }
        });
    });
};