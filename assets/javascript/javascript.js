//alert("hello");
$(document).ready(function() {

//This app should take the topics in this array and create buttons in HTML.
    var topics = ['Cats', 'Dogs','Bull', 'Lion'];

    function toCreateTopicsButton() {
        $("#topics-button").empty();
    
        for (var i = 0; i < topics.length; i++) {
            var topicsDiv = $("<button>");
            //console.log(newTopicsDiv);
            topicsDiv.addClass("btn");
            topicsDiv.attr("data-topics", topics[i]);
            topicsDiv.text(topics[i]);
            //console.log(newTopicsDiv)
            $("#topics-button").append(topicsDiv);
            //console.log(topicsDiv);
        }
    }
    toCreateTopicsButton();

//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
//Under every gif, display its rating (PG, G, so on). 

  $(document).on("click", ".btn", function() {
      //Variables needed for API interaction
      var searchTopic = $(this).attr("data-topics");
      var limit = 10;
      var apiKey = "dc6zaTOxFJmzC";

      // Constructing a URL to search Giphy for the name of the searchTopic.     
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=" + apiKey + "&limit=" + limit;
      //console.log(queryURL);
      
      //Empties the previously loaded gifs
      //$("#topics-dump-here").empty();
      //Ajax call function    
      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          //console.log(response);
          //storing an array of result in the results variable.
          var results = response.data;
          //console.log(results);
          //Looping over every result item.
          for (var i = 0; i < results.length; i++) {
              //Creating a div with a class "item".
              var gifDiv = $("<div class='gif'>");
              //console.log(gifDiv);
              var rating = results[i].rating;
              //console.log(rating);
              var p = $("<p>").text("Rating: " + rating);
              //console.log(p);
              //Creating a image tag
              var gifImage = $("<img>");
              var gifUrl = results[i].images.fixed_height.url;
              //console.log(topicImage);
              //Giving the image tag an src attribute of a proprty pulled off the result item for pausing and animating functionality by clicking gif.
              gifImage.addClass("gif");
              gifImage.attr("src", gifUrl.replace(".gif", "_s.gif"));
              gifImage.attr("data-still", gifUrl.replace(".gif", "_s.gif"));
              gifImage.attr("data-animate", gifUrl.replace("s_.gif", ".gif"));
              gifImage.attr("data-state", "still");
              //console.log(gifDiv);
              // Appending the paragraph and topicImage we created to the "gifDiv" div.
              gifDiv.prepend(p);
              gifDiv.prepend(gifImage);
              //console.log(topicImage);

              $("#topics-dump-here").prepend(gifDiv);
          }

//When the user clicks one of the still GIPHY images, the gif should animate. 
//If the user clicks the gif again, it should stop playing.
          
          $(".gif").on("click", function(event) {
                var state = $(this).attr("data-state");
                console.log(state);

                 if (state === "still") {
                     $(this).attr('src', $(this).data("animate"));
                      $(this).attr('data-state', "animate");
                  } 

                  else  {
                       $(this).attr('src', $(this).data("still"));
                       $(this).attr('data-state', "still");
                  }
          });
        });
      });


//Add a form to page takes the value from a user input box and adds it into `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    $("#add-topic").on("click", function(event) {
          event.preventDefault();
          var newTopics = $("#topics-input").val().trim();
          topics.push(newTopics);
          //Resets the text entered in the text field
          $("#topics-form")[0].reset();
          //Regenerates the topic button on the DOM
          toCreateTopicsButton();
     });
});
