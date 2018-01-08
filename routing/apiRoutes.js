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
            console.log(data[0]);
            var uneaten = [];
            var eaten = [];
            // for (let i = 0; i < data.length; i++) {
            //     if (data[i].devoured) {
            //         eaten.push(data[i])
            //         console.log(JSON.stringify(eaten));
            //     } else {
            //         uneaten.push(data[i])
            //         console.log(JSON.stringify(uneaten));
            //     }
            //     res.render("index", {uneatenBurger: uneaten});
            // }
            // console.log(JSON.stringify(uneaten));
            // console.log(JSON.stringify(eaten));
            res.render("index", {uneatenBurger: data});
        });
    });

    // If a user sends data to add a new character...
    app.post("/api/new", function (req, res) {
        // Take the request...
        console.log("im adding a new burger");
        var newBurger = req.body;
        console.log(newBurger);
        // Then send it to the ORM to "save" into the DB.
        orm.insertOne(newBurger, function (data, err) {
            // if (err){
            //     console.log("hit an error:");
            //     console.log(err);
            //     return res.status(500).end();
            // }
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