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
  $("#new").on('click', function(){
    hide_contacts();
    var open_ul = "<ul>"
    var email = "<li> Email: <input type='text' id='email'></li>";
    var first_name = "<li> First Name: <input type='text' id='first_name'></li>";
    var last_name = "<li> Last Name: <input type='text' id='last_name'></li>";
    var phone_number = "<li> Phone Number: <input type='number' id='phone_number'></li>";
    var update_and_delete = "<li><button id='submit_new_contact'>Add</button></li>";
    var close_ul = "</ul>"
    // contact.first_name = 
    $('.home').append(open_ul, email, first_name, last_name, phone_number, update_and_delete, close_ul);
    $("#submit_new_contact").on('click', function(){
      var contact = {};
      contact.email = $("#email").val();
      contact.first_name = $("#first_name").val();
      contact.last_name = $("#last_name").val();
      contact.phone_number = $("#phone_number").val();
      contact = {contact: contact}
      $.ajax({
        url: '/contacts.json',
        type: 'POST',
        data: contact,
        success: function(result) {
          console.log('created contact successfully');
          hide_contacts();
          $.getJSON('/contacts.json', function(data){
            list_contacts(data);
          });
        }
      });
    });
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
      var update_and_delete = "<li><button class='update_contact_button' data-contact-id=" + i + ">Update</button> <button class='delete_contact_button' data-contact-id=" + i + ">Delete</button></li>";
      var close_ul = "</ul>"
      $('.home').append(open_ul, first_name, last_name, phone_number, email, update_and_delete, close_ul)
      $('.delete_contact_button').on('click', function(){
        var contact_pos = this.getAttribute("data-contact-id");
        $.ajax({
          url: '/contacts/' + data[contact_pos].id + '.json',
          type: 'DELETE',
          success: function(result) {
            console.log('deleted successfully');
            hide_contacts();
            $.getJSON('/contacts.json', function(data){
              list_contacts(data);
            });
          }
        });
      });
      $('.update_contact_button').on('click', function(){
        var contact_pos = this.getAttribute("data-contact-id");
        $.ajax({
          url: '/contacts/' + data[contact_pos].id + '.json',
          type: 'PATCH',
          success: function(result) {
            console.log('update successfully');
            hide_contacts();
            $.getJSON('/contacts.json', function(data){
              list_contacts(data);
            });
          }
        });
      });
    };
  };

  function hide_contacts(){
    $("li").remove();
  };

});