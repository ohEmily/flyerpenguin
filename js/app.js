

// https://www.facebook.com/events/657947197574532/?ref=2&ref_dashboard_filter=upcoming


// parse a FB event id from a url
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

// convert facebook's time format to a human readable string
function fb_date_time_to_human(fb_time){
  if (typeof fb_time == 'undefined'){
    return "";
  }
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

  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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

function wrap_in_p_tag(s){
  if (typeof s == 'undefined'){
    s = "";
  }
  return "<p>" + s + "</p>"
}

// display the overlay div and populate flyer with event details
function create_overlay(fb_event){
	var overlay_wrapper = $('.overlay_wrapper');

	overlay_wrapper.slideDown('slow');

	$(".print-modal").show();
	
	$(".flyer_title").html(wrap_in_p_tag(fb_event.name));

  var description_lines = fb_event.description.split("\n");

  $(".flyer_description").empty();
  for (var i = 0 ; i < description_lines.length; i++){
    $(".flyer_description").append(wrap_in_p_tag(description_lines[i]));
  }

//	$(".flyer_description").html(fb_event.description);
  console.log(description_lines);

	$(".flyer_when").html(wrap_in_p_tag(fb_event.location));

  var start_time = fb_date_time_to_human(fb_event.start_time);

	$(".flyer_where").html(wrap_in_p_tag(start_time));
  $(".flyer_image img").remove();
  $('.flyer_image').append('<img class="flyer_image_no_overlay" src="' + fb_event.cover.source + '" alt="event image" />');
  
  // reduce opacity of flyer image if you hover over it
  $('.flyer_image').mouseenter(function(){
	  $('.flyer_image_no_overlay').addClass('transparent_flyer_image');
    $('.flyer_image_overlay').removeClass('hidden');
  });

  $('.flyer_image').mouseleave(function(){
	  $('.flyer_image_no_overlay').removeClass('transparent_flyer_image');
    $('.flyer_image_overlay').addClass('hidden');
  });

  $('.flyer_image').click(function(){
    $(this).remove();
  });
  
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
  // facebook login
	$('.fb_login_button').click(function(){
		facebook_login(this);
    $(this).tooltip('show');
	});

  // bring up browser print dialog
	$('.print-modal').click(function(){
		setTimeout(window.print(),500);
	});
  
  // generate a printable flyer based on the provided event url and FB auth
	$('.generate_button').click(function(){
		var url_field = $('.event_url_field');
		var event_url = url_field.val();
    if ((event_url).length == 0){
      $('.event_url_field').tooltip('show');
      console.log("zero");
      return;
    }
		var event_id = event_id_from_url(event_url);

    // get event details from facebook
		get_facebook_event(event_id, function(fb_event){
      // code called upon completed API request:

			console.log(fb_event);

			create_overlay(fb_event);
		});
	});
});
