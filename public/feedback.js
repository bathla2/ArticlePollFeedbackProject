$.ajax({
  method: "GET",
  url: "/populated" 
})
  .then(function(data) {
  console.log(data);
    for(var i=0; i<data.length; i++)
    {
     var countYes = 0;
     var countNo = 0;
     for(var j=0; j<data[i].notes.length; j++)
     {
       switch (data[i].notes[j].body) 
       {
         case 'Yes':
         countYes++;
         break;
         case 'No':
         countNo++;
         break;
       }
     }
       $("#poll").append("<div class='col-md-4'><div class='card'  style='width: 18rem;'><div class='card-header'>" + data[i].title + ": Feedback</div>"+ "<ul class='list-group list-group-flush'><li class='list-group-item'>Did you like this article?</li><li class='list-group-item'>Number of people voted Yes: "+"<div class='alert alert-success' role='alert'>"+countYes+"</div>"+"</li><li class='list-group-item'>Number of people voted No: "+"<div class='alert alert-warning' role='alert'>"+countNo+"</div>"+"<li class='list-group-item'></li></li></ul></div></div>");
    } 
       
  });

  