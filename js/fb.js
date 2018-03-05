
$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/all.js', function(){
      // initialize the FB object
      FB.init({
        appId: '1407361809535146',
        forceBrowserPopupForLogin: false
      });     
    });

});

var get_facebook_event = function(event_id, callback_fn){

  var fields = "?fields=cover,name,description,start_time,end_time,place";
  if (typeof FB === 'undefined'){
    alert("Please log in first. ");
    return;
  }

  // call the api to get the event
  FB.api(
    '/' + event_id + fields,
    'GET',

    // handle the api response
    function(response){
      console.log("get fb event");
      console.log(response);

      // handle an error
      if (!response || response.error){
        console.log("error occurred fetching event");
      }
      // handle a successful login
      else{
        console.log("success fetching event")

        // send the fb_event object to the callback function
        callback_fn(response); 
      }
    });
  }

  function facebook_login(item){
    console.log("trying to login");
    FB.getLoginStatus(function(response){
      if (response.status !== 'connected'){
        // ask the user to authenticate
        FB.login(function(response){
        }, {
          scope: 'user_events',
          return_scopes: true
        });
      }
      else{
        $(item).html("successfully logged in");
        $(item).addClass("logged_in");
      }
    }); 

  }
