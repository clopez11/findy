$(document).ready(function(){
  $.getJSON('/contacts.json', function(data){
    console.log(data);
  });
});