$(document).on('click', '#submitBtn', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("i clicked submit");

    var newBurger = $("#newBurger").val().trim();
    console.log("newBurger: " + newBurger);
    // Send the POST request.
    $.ajax("/api/new", {
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