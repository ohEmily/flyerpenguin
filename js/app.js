
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

function fb_date_time_to_human(fb_time){
  fb_time = fb_time.split("T");

  var date_arr = fb_time[0].split("-");
  var time_arr = fb_time[1].split("-")[0].split(":");

  var year = Number(date_arr[0]);
  var month = Number(date_arr[1]);
  month -= 1;
  var date = Number(date_arr[2]);

  var hour = Number(time_arr[0]);
  var minute = Number(time_arr[1]);


  var js_date = new Date(year, month, date, hour, minute);

  var ampm = "am";
  if (hour > 12){
    hour -= 12;
    ampm = "pm";
  }


  var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  var month_word = months[month];

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var day_word = days[js_date.getDay()];


  var minutes = js_date.getMinutes().toString();

  if (minutes.charAt(0) === '0'){
    minutes = '00';
  }

  var string = hour + ":" + minutes + " " + ampm + " on " +
    day_word + " " + month_word + " " + js_date.getDate() + ", " + js_date.getFullYear();

  return string;
}

function create_overlay(fb_event){
	var overlay_wrapper = $('div.overlay_wrapper');

	overlay_wrapper.slideDown('slow');

	$(".print-modal").show();
	
	$(".flyer_title").html(fb_event["name"]);
	$(".flyer_description").html(fb_event["description"]);
	$(".flyer_when").html(fb_event["location"]);

  var start_time = fb_date_time_to_human(fb_event["start_time"]);

	$(".flyer_where").html(start_time);

	overlay_wrapper.click(function(e){
    if (e.target.id !== 'overlay_wrapper'){
      return;
    }
		overlay_wrapper.slideUp('fast');
		$(".print-modal").hide();
	});
}



$(document).ready(function()
{
	$('.fb_login_button').click(function()
	{
		facebook_login();
	});

	$('.print-modal').click(function()
	{
		window.print();
	});
  
	$('.generate_button').click(function()
	{
		var url_field = $('.event_url_field');
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
