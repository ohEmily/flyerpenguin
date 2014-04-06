var get_facebook_event = function(event_id, callback_fn){

  var FB_EVENT = null;

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    // initialize the FB object
    FB.init({
      appId: '1407361809535146',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');

    // ask the user to authenticate
    FB.login(function(){

      // call the api to get the event
      FB.api(
        '/' + event_id,
        'get',

        // handle the api response
        function(response){

          // handle an error
          if (!response || response.error){
            console.log("Login error occurred. ");
          }
          // handle a successful login
          else{
            console.log("Successful login. ")
            console.log(response);

            // set the event object
            FB_EVENT = response;
            callback_fn(FB_EVENT);
          }
       });
    }, {scope: ''});
  });
}

$(document).ready(function() {

  // dummy id: 1407361809535146
  $('#generate_button').click(function(){
    var url_field = $('#url_field');
    var event_id = url_field.val();

    if (event_id.length == 0){
      event_id = '1407361809535146';
    }

    get_facebook_event(event_id, function(fb_event){
      console.log("got event:");
      console.log(fb_event);
    });
  });
});
