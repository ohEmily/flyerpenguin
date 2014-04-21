
$(document).ready(function() {

    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
      // initialize the FB object
      FB.init({
        appId: '1407361809535146',
        forceBrowserPopupForLogin: false
      });     
    });

});

var get_facebook_event = function(event_id, callback_fn){

  var fields = "?fields=cover,name,description,start_time,end_time,location";
  if (typeof FB === 'undefined'){
    alert("Please log in first. ");
    return;
  }

  // call the api to get the event
  FB.api(
    '/' + event_id + fields,
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
        FB.login(function(){

        }, {scope: ''});
      }
      else{
        $(item).html("successfully logged in");
        $(item).addClass("logged_in");
      }
    }); 

  }
