// Grab the articles as a json
$.getJSON("/articles", function(data) {
  //console.log(data);
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    $("#articles").append("<p data-id='" + data[i]._id + "'><button type='button' class='list-group-item list-group-item-action'>" + data[i].title + "<br />" + data[i].link + "</button></p>");
  }
});


// Whenever someone clicks a p tag

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  var currentInput = $("input:checked").val();
  switch (currentInput) {
    case 'Yes':
    alert("Thanks for your positive feedback");
    break;
    case 'No':
    alert("Thanks for your feedback, sorry to hear you didn't like the article");
    break;
  }
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
        body: $("input:checked").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $( "#dialog" ).dialog('close');
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
     
       $( "#dialog" ).dialog();
     
      // The title of the article
      $("#notes").append("<p>" + data.title + ": Did you like this article?</p>");
      // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      //$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      
      $("#notes").append("<form> <input type = 'radio' name = 'vote' value = 'Yes'>Yes");
      $("#notes").append("<input type = 'radio' name = 'vote' value = 'No'>No");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button></form>");
      // If there's a note in the article
      // if (data.note) {
      //   // Place the title of the note in the title input
      //   $("#titleinput").val(data.note.title);
      //   // Place the body of the note in the body textarea
      //   $("#bodyinput").val(data.note.body);
      // }
    });
});