var topics = ["Sponge Bob","Rick and Morty", "Bobs Burger"];

    




    $("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newSearch = $("input").val().trim();
        shows.push(newSearch);
        console.log(shows);
        $("#input").val('');
        displayButtons();

    });

    function displayButtons() {
        $("#myButtons").empty();
        for(var i = 0; i < topics.length;i++) {
            var a = $('<button class="btn btn-light">');
            a.attr("id", "topic");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
        };
    
displayButtons();

$(document.body).on("click", "#topic", function() {
    console.log("button pressed");
    var m = $(this).data("search");
    console.log(m);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + m + "&api_key=1WnRtAigdHci03kcNJWbJzYMJDTDnZvQ&limit=10";
    console.log(queryURL);
    




    $.ajax({
            url: queryURL,
            method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            var showDiv = $("<div class='col-md-4'>");

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var image = $("<img>");
            
        




            image.attr("src", still);
            image.addClass("Giphy");
            image.attr("data-state", "still");
            image.attr("data-still", still);
            image.attr("data-animate", animated);
            showDiv.append(image);
            $("#gifArea").prepend(showDiv);
        }
    });

});

$("#gifArea").on("click", function(){
console.log(this)
    
    var state = $(this).attr("data-state");
    var url = $(this).attr("src");
    console.log(state)
    console.log(url)
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }




})



