var topics = ["Salman Khan", "Shah Rukh Khan", "James Bond", "La La Land", "Ronaldo", "Real Madrid"
];

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button class = 'button'>");
    a.addClass("giphy");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
  displayGiphy();
}


function displayGiphy() {
  $("button").on("click", function () {

      var giphy = $(this).attr("data-name");
      if (giphy === "") {
        alert("Please Enter a Valid Search!");
      } else {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=wRIz1g2bmMxoGZOvgWa0K9UcmZjRikyq&limit=10&rating=pg";
        console.log("giphy" + giphy);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (response) {
          var topicsResults = response.data;
          console.log(topicsResults);
          
          $("#gifs-view").empty(topicDisplay);
         
          for (var i = 0; i < topicsResults.length; i++) {
            console.log("Search Results: " + topicsResults);
            var topicDisplay = $("<div class='card'>");
            var rating = topicsResults[i].rating;
            var p = $("<div class = 'card-title'>").text("Rating: " + rating + "  " + giphy);
            var giphyImage = $("<img>");
            giphyImage.attr("src", topicsResults[i].images.fixed_height_still.url);
            giphyImage.attr("data-state", "still");
            giphyImage.attr("data-still", topicsResults[i].images.fixed_height_still.url);
            giphyImage.attr("data-animate", topicsResults[i].images.fixed_height.url);
            giphyImage.addClass("gif");

            
            $(".gif").on("click", function () {
            
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
            topicDisplay.append(p);
            topicDisplay.append(giphyImage);
            console.log(giphyImage);
            $("#gifs-view").append(topicDisplay);
          }
        });
      }
    }

  )
} 

$("#add-gifs").on("click", function (event) {
  event.preventDefault();

  var giphy = $("#gifs-input").val().trim();
  if (giphy === "") {
    alert("Not valid input");
    $("#gifs-input").focus();
  } else {
    topics.push(giphy);
    console.log(topics)
    renderButtons();
    $("#gifs-input").val("");
  }
});
renderButtons();