
// https://www.facebook.com/events/657947197574532/?ref=2&ref_dashboard_filter=upcoming 
function event_id_from_url(url)
{
	var start_index = url.indexOf("/events/");
	start_index = start_index + "/events/".length;
	
	var end_index = url.indexOf("/", start_index);
	// if no slash at the end of the url
	if (end_index == "-1")
		end_index = url.length;
	
	var event_id = url.substring(start_index, end_index);
	return event_id;
}

function create_overlay(event){

  var overlay_wrapper = $('div#overlay_wrapper');

  overlay_wrapper.slideDown('slow');


  overlay_wrapper.click(function(){
    overlay_wrapper.slideUp('fast');
  });
}



$(document).ready(function() {


  // dummy id: 1407361809535146
  $('#generate_button').click(function(){
    var url_field = $('#url_field');
    var event_url = url_field.val();
    var event_id = event_id_from_url(event_url);

    // FOR DEBUGGING ONLY
    if (typeof event_url == 'undefined'){
      return;
    }

    console.log("event id: " + event_id);

    get_facebook_event(event_id, function(fb_event){
      console.log("got event:");
      console.log(fb_event);

      create_overlay(fb_event);
    });
  });

});
