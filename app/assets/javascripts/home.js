$(document).ready(function(){
  $('.contact_info').hide()
  $('#index').on('click', function(){
    $('.contact_info').show()
    $.getJSON('/contacts.json', function(data){
      $('#email').html(data[0].email);
      $('#first_name').html(data[0].first_name);
      $('#last_name').html(data[0].last_name);
      $('#phone_number').html(data[0].phone_number);
    });   
  })

});