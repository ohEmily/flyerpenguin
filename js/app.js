// make sure that the url field is a Facebook event
function is_valid_url(url)
{
	if (url.indexOf("facebook.com/events/") == -1)
		return false;
	return true;
}

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

// display the overlay div and populate flyer with event details
function create_overlay(fb_event){
	var overlay_wrapper = $('.overlay_wrapper');

	overlay_wrapper.slideDown('slow');

	$(".print-modal").show();
	
  populate_overlay(fb_event);

  overlay_wrapper.click(function(e){
    if (e.target.id !== 'overlay_wrapper'){
      return;
    }
    overlay_wrapper.slideUp('fast');
    $(".print-modal").hide();
  });
}


function clear_flyer_overlay(){
  $(".editable").html("");
  $(".flyer_image img").remove();
}

$(document).ready(function()
{
  // facebook login
	$('.fb_login_button').click(function(){
		facebook_login(this);
    $(this).tooltip('show');
	});

  // bring up browser print dialog
	$('.print-button').click(function(){
		setTimeout(window.print(),500);
	});
  
  // generate a printable flyer based on the provided event url and FB auth
	$('.generate_button').click(function(){
		var url_field = $('.event_url_field');
		var event_url = url_field.val();
    
		if (!is_valid_url(event_url))
		{
		  $('.event_url_field').tooltip('show');
		  $('#link_field').addClass('has-error');
		  console.log("zero");
		  return;
		}
		else
		{
		  $('#link_field').removeClass('has-error');
		}
		
		
		var event_id = event_id_from_url(event_url);

		// get event details from facebook
		get_facebook_event(event_id, function(fb_event){
			// code called upon completed API request:
			console.log(fb_event);
			clear_flyer_overlay();
			create_overlay(fb_event);
		});
	});

  $('.editable').hover(function(){
    $(this).toggleClass("border-highlight");
  });

});
