
// https://www.facebook.com/events/657947197574532/?ref=2&ref_dashboard_filter=upcoming 
function event_id_from_url(url){
  var start_index = url.indexOf("/events/");
	start_index = start_index + "/events/".length;
	
	var end_index = url.indexOf("/", start_index);
	// if no slash at the end of the url
	if (end_index == "-1")
		end_index = url.length;
	
	var event_id = url.substring(start_index, end_index);
	return event_id;
}

function create_overlay(fb_event)
{
	var overlay_wrapper = $('div#overlay_wrapper');

	overlay_wrapper.slideDown('slow');

	$("#print-modal").show();
	
	$("#flyer_title").html(fb_event["name"]);
	$("#flyer_description").html(fb_event["description"]);
	$("#flyer_when").html(fb_event["location"]);
	$("#flyer_where").html(fb_event["start_time"]);

	overlay_wrapper.click(function()
	{
		overlay_wrapper.slideUp('fast');
		$("#print-modal").hide();
	});
}



$(document).ready(function()
{
	$('#fb_login_button').click(function()
	{
		facebook_login();
	});

	$('#print-modal').click(function()
	{
		window.print();
	});
  
	$('#generate_button').click(function()
	{
		var url_field = $('#url_field');
		var event_url = url_field.val();
		var event_id = event_id_from_url(event_url);

		console.log("event id: " + event_id);

		get_facebook_event(event_id, function(fb_event)
		{
			console.log("got event:");
			console.log(fb_event);

			create_overlay(fb_event);
		});
	});
});
