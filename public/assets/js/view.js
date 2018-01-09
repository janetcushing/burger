$(document).on('click', '#submitBtn', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("i clicked submit");

    // var newNewBurger = {
    //     movie: $("#createmovie [name=movie]").val().trim()
    //   };
    var newBurger = { burger_name: $("#newBurger").val().trim()};
    // var new_burger_name =  {burger_name: newBurger};
    console.log("newBurger: " + JSON.stringify(newBurger));
    // console.log("new_burger_name: " + new_burger_name);
    // Send the POST request.
    $.ajax("/index", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});


$(document).on('click', '.devour', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("i clicked a devour button");
    var id = $(this).data("id");
    console.log("id: " + id);

    // Send the POST request.
    $.ajax("/api/devoured/" + id, {
        type: "PUT",
        data: id
    }).then(
        function () {
            console.log("devoured new burger");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});