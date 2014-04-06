
// https://www.facebook.com/events/657947197574532/?ref=2&ref_dashboard_filter=upcoming 
function event_id_from_url(url)
{
	 var url_array = url.split('/');
   return url_array[4];
}



$(document).ready(function() {


  // dummy id: 1407361809535146
  $('#generate_button').click(function(){
    var url_field = $('#url_field');
    var event_url = url_field.val();
    var event_id = event_id_from_url(event_url);

    // FOR DEBUGGING ONLY
    if (typeof event_id == 'undefined'){
      return;
    }

    console.log("event id: " + event_id);

    get_facebook_event(event_id, function(fb_event){
      console.log("got event:");
      console.log(fb_event);
    });
  });
});
