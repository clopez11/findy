$(document).ready(function(){
  $('#hide_index').hide();
  $('#index').on('click', function(){
    $('#hide_index').show();
    $('#index').hide();
    $.getJSON('/contacts.json', function(data){
      for (i = 0; i < data.length; i++){
        var open_ul = "<ul>"
        var email = "<li> Email: " + data[i].email + "</li>";
        var first_name = "<li> First Name: " + data[i].first_name + "</li>";
        var last_name = "<li> Last Name: " + data[i].last_name + "</li>";
        var phone_number = "<li> Phone Number: " + data[i].phone_number + "</li>";
        var close_ul = "</ul>"
        $('.home').append(open_ul, first_name, last_name, phone_number, email, close_ul)
      }
    });
  });
  $("#hide_index").on('click', function(){
    $("li").remove();
    $('#hide_index').hide();
    $('#index').show();
  });
  

});