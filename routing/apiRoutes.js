// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var orm = require("../config/orm.js");


// Routes
// =============================================================
module.exports = function (app) {

    app.get("/index", function (req, res) {
        // Then display the JSON for the uneaten burgers
        // (Note how we're using the ORM here to run our searches)
        console.log("apiRoutes.js get");
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
            console.log(JSON.stringify(uneaten));
            console.log(JSON.stringify(eaten));
            res.render("index", {uneatenBurger: data});
        });
    });

    // If a user sends data to add a new burger...
    app.post("/index", function (req, res) {
        // Take the request...
        console.log("im adding a new burgerxxx");
        var newBurger = req.body.burger_name;
        console.log("newBurgerxxx: " + newBurger);
        // console.log("burgerName: " + burgerName);
        // Then send it to the ORM to "save" into the DB.
        orm.insertOne(newBurger, function (data, err) {
            if (err){
                console.log("hit an error:");
                console.log(err);
                return res.status(500).end();
            }
            console.log("inserted the burger");
            console.log(data);
        });

    });

    // update
    app.put("/api/devoured/:id", function (req, res) {
        // Take the request...
        console.log("im devouring a burger");
        // Then send it to the ORM to "save" into the DB.
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
                console.log(data);
                res.status(200).end();
            }

        });

    });
};