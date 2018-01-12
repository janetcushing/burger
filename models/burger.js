// =============================================================
// Dependencies
// =============================================================
var orm = require("../config/orm.js");


var burger = {
    all: function(cb){
    orm.selectAll(function (data) {
        // console.log(data); 
        cb(data)
    })
},
    create: function(values, cb) {
        orm.insertOne(values, function (data) {
            // if (err) {
            //     console.log("hit an error:");
            //     console.log(err);
            //     return (res.status(500).end());
            // }
            console.log("inserted the burger");
            cb(data);
            
        });
    },
    update: function(burgerId, callback) {
        orm.updateOne(burgerId, function(res) {
          callback(res);
        });
      }
}

module.exports = burger;

// orm.updateOne(burgerId, function (data, err) {
    //         if (err) {
    //             // If an error occurred, send a generic server faliure
    //             console.log(err);
    //             return res.status(500).end();
    //         } else if (data.changedRows == 0) {
    //             console.log(data);
    //             // If no rows were changed, then the ID must not exist, so 404
    //             console.log("burger row did not get updated");
    //             return res.status(404).end();
    //         } else {
    //             console.log("updated the burger");
    //             res.status(200).end();
    //         }
    //     });
    // });