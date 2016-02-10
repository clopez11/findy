$(document).ready(function(){

  $('#hide_index').hide();
  $('#index').on('click', function(){
    $('#hide_index').show();
    $('#index').hide();
    $.getJSON('/contacts.json', function(data){
      list_contacts(data);
    });
  });
  $("#hide_index").on('click', function(){
    hide_contacts();
    $('#hide_index').hide();
    $('#index').show();
  });

  $("#contact_id").on('keyup', function(){
    hide_contacts();
    var contact_id = $('#contact_id').val();
    $.getJSON('/contacts/' + contact_id + '.json', function(data){
      list_contacts([data]);
    }); 
  });

  $("#search").on('keyup', function(){
    hide_contacts();
    var search_term = $("#search").val().toLowerCase();
    if(search_term){
      $.getJSON('/contacts.json', function(data){
        var matches = []
        for(i = 0; i < data.length; i++){
          if((data[i].first_name.toLowerCase().indexOf(search_term) > -1) 
            || (data[i].last_name.toLowerCase().indexOf(search_term) > -1 )
            || (data[i].email.toLowerCase().indexOf(search_term) > -1 )
            || (data[i].phone_number.toLowerCase().indexOf(search_term) > -1 )){
            if(matches.indexOf(data[i]) == -1){
              matches.push(data[i]);
            };
          };
        };
        list_contacts(matches);
      });
    };
  });

  function list_contacts(data){
    for (i = 0; i < data.length; i++){
      var open_ul = "<ul>"
      var email = "<li> Email: " + data[i].email + "</li>";
      var first_name = "<li> First Name: " + data[i].first_name + "</li>";
      var last_name = "<li> Last Name: " + data[i].last_name + "</li>";
      var phone_number = "<li> Phone Number: " + data[i].phone_number + "</li>";
      var close_ul = "</ul>"
      $('.home').append(open_ul, first_name, last_name, phone_number, email, close_ul)
    }
  };
  function hide_contacts(){
    $("li").remove();
  };

});