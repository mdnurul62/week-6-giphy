//alert("hello");

//As per instruction, I need to create an array of strings of animal and save it to a variable called `topics`. 

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


//Add a form to page takes the value from a user input box and adds it into `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    $("#add-topic").on("click", function(event) {
          event.preventDefault();
          var newTopics = $("#topics-input").val().trim();
          topics.push(newTopics);
          toCreateTopicsButton();

  });

//A generic function for capturing the movie name from the data-attribute

function alertTopicsName () {
  var topicsName = $(this).attr("data-topics");
  alert(topicsName);
}


//Adding a click event listener to all elements with the class "btn". to the document because it will work for dynamically generated elements.

$(document).on("click", ".btn", alertTopicsName );

toCreateTopicsButton();

//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
//Under every gif, display its rating (PG, G, so on). 

	$("button").on("click", function() {

      var topic = $(this).attr("data-topics");
 // Constructing a URL to search Giphy for the name of the topic.     
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
      //console.log(queryURL);
 //Ajax call     
      $.ajax({
          url: queryURL,
          method: "GET"
        })

          .done(function(response) {
          console.log(response);
    //storing an array of result in the results variable.
          var results = response.data;
          //console.log(results);
    //Looping over every result item.
          for (var i = 0; i < results.length; i++) {
    //Creating a div with a class "item".
            var gifDiv = $("<div class='gifs'>");
            //console.log(gifDiv);
            var rating = results[i].rating;
            //console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            //console.log(p);
    //Creating a image tag
            var gifImage = $("<img>");
            //console.log(topicImage);
    //Giving the image tag an src attribute of a proprty pulled off the result item
              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);
              gifImage.attr("data-state", "still");
              //console.log(gifDiv);
    // Appending the paragraph and topicImage we created to the "gifDiv" div we created.
              gifDiv.prepend(p);
              gifDiv.prepend(gifImage);
              //console.log(topicImage);

            $("#topics-dump-here").prepend(gifDiv);
          }
        });
    });



//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.


$(".gifs").on("click", function() {
      		var state = gifImage.attr("data-state");

      			if (state === "still") {
        		    gifImage.attr('src', gifImage.attr("data-animate"));
        		    topicImage.attr('data-state', "animate");
      		} else  {
       			    gifImage.attr('src', gifImage.attr("data-still"));
        		    gifImage.attr('data-state', "still");
      		}
	});










