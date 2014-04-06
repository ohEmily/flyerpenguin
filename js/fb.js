$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '1407361809535146',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
  });

});