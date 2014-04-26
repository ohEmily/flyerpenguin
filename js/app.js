// make sure that the url field is a Facebook event
function is_valid_url(url)
{
	if (url.indexOf("facebook.com/events/") == -1)
		return false;
	return true;
}

// shows Bootstrap tooltip if event url hasn't been filled
var show_tooltip = function(event_url)
{
	if (!is_valid_url(event_url))
	{
	  $('.event_url_field').tooltip('show');
	  console.log("zero");
	  return;
	}
}

// colors textfield border red or green depending on user input validity
var update_textfield = function()
{
	var url_field = $('.event_url_field');
	var event_url = url_field.val();
		
	if (!is_valid_url(event_url))
	{
		$('#link_field').addClass('has-error');
	}
	else
	{
		$('#link_field').removeClass('has-error');
	    $('#link_field').addClass('has-success');
	}
	
	if(event_url.length == 0)
	{
		$('#link_field').removeClass('has-error');
	    $('#link_field').removeClass('has-success');	
	}
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

/*
  overlay_wrapper.click(function(e){
    if (e.target.id !== 'overlay_wrapper'){
      return;
    }
    overlay_wrapper.slideUp('fast');
    $(".print-modal").hide();
  });
*/
  $('.close-flyer').click(function(){
    overlay_wrapper.slideUp('fast');
    $(".print-modal").hide();
  });

  $('.start-over').click(function(){
    populate_overlay(fb_event);
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
    $('.overlay').animate({ scrollTop: 0 }, 0);
		setTimeout(window.print(),500);
	});
  
  // give user visual feedback if they put in a good or bad url
    $('#link_field').keypress(update_textfield);
	$('#link_field').focusout(update_textfield);
  
  // generate a printable flyer based on the provided event url and FB auth
	$('.generate_button').click(function(){
		var url_field = $('.event_url_field');
		var event_url = url_field.val();
		
		var event_id = event_id_from_url(event_url);
		
		// if no url present, directs user to enter one
		show_tooltip(event_url);

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
