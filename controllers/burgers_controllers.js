// *********************************************************************************
// burgers_controllers.js - this file offers a set of routes for displaying
// and saving data to the db
// *********************************************************************************

// =============================================================
// Dependencies
// =============================================================
var express = require("express");
var orm = require("../config/orm.js");
var burger = require("../models/burger");
var router = express.Router();

// =============================================================
// Routes
// =============================================================

      router.get("/", function(req, res) {
          console.log("im in the get/");
        burger.all(function(data) {
          var uneaten = [];
          var eaten = [];
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            if (data[i].devoured) {
                eaten.push(data[i])
            } else {
                uneaten.push(data[i])
            }
        }
        console.log("uneaten " + JSON.stringify(uneaten));
        res.render("index", {
            uneatenBurger: uneaten,
            eatenBurger: eaten
        });
        });
      });

      router.get("/index", function(req, res) {
        burger.all(function(data) {
        //   var hbsObject = {
        //     burgers: data
        //   };
        //   console.log(hbsObject);
          var uneaten = [];
          var eaten = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].devoured) {
                eaten.push(data[i])
            } else {
                uneaten.push(data[i])
            }
        }
        res.render("index", {
            uneatenBurger: uneaten,
            eatenBurger: eaten
        });
        });
      });


    // add a new burger
    router.post("/api/burgers", function (req, res) {
        console.log("im adding a new burgerzzz");
       
       
        // newBurger = req.body;
        // console.log("newBurger: " + newBurger);
        // var burgerObject = {
        //     "burger_name": req.body.burger_name
        //   };
        //   console.log(newBurger);
        burger.create([req.body.burger_name], function(result){
            res.status(200).end();
        }); 
    });

    // update the devoured status
    router.put("/api/devoured/:id", function (req, res) {
        console.log("im devouring a burger");
        // update the DB.
        var burgerId = req.params.id;
        console.log("id " + burgerId);
        burger.update(burgerId, function(data, err) {
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

module.exports = router;