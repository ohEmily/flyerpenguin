
function populate_overlay(fb_event){

  var flyer_title = wrap_in_p_tag(fb_event.name);
  var flyer_where = wrap_in_p_tag(fb_event.location);

  var start_time = fb_date_time_to_human(fb_event.start_time);
  var flyer_when = wrap_in_p_tag(start_time);

  $(".flyer_title").html(flyer_title);
  $(".flyer_where").html(flyer_where);
  $(".flyer_when").html(flyer_when);

  write_event_description(fb_event.description);
  write_event_image(fb_event.cover);


  set_jquery_bindings(fb_event);

  
}

function set_jquery_bindings(fb_event){

  $('.toggle-image').unbind();
  $('.toggle-image').click(function(){
    // if an image is present, remove it
    var flyer_image = $(".flyer_image img");
    if (flyer_image.length > 0){
      flyer_image.remove();
    }

    // otherwise add it
    else{
      write_event_image(fb_event.cover);
    }

  });
}

function write_event_image(cover){
  if (typeof cover === 'undefined'){
    return;
  }
  else if (typeof cover.source === 'undefined'){
    return;
  }

  $('.flyer_image img').remove();

  $('.flyer_image').append('<img class="flyer_image_no_overlay" src="' + cover.source + '" alt="event image" />');
  
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
    $('.flyer_image img').remove();
  });
}

function write_event_description(description){

  var description_lines;
  if (typeof description !== 'undefined'){
    description_lines = description.split("\n");
  }
  else {
    description_lines = [""];
  }

  $(".flyer_description").empty();

  for (var i = 0 ; i < description_lines.length; i++){
    $(".flyer_description").append(wrap_in_p_tag(description_lines[i]));
  }

}

// convert facebook's time format to a human readable string
function fb_date_time_to_human(fb_time){
  if (typeof fb_time == 'undefined'){
    return "";
  }
  fb_time = fb_time.split("T");

  var hour,minute;

  var time_string = "";

  // if a time is provided
  if (fb_time.length === 2){
    var time_arr = fb_time[1].split("-")[0].split(":");
    hour = Number(time_arr[0]);
    minute = Number(time_arr[1]).toString();

    if (minute.charAt(0) === '0'){
      minute = '00';
    }

    var ampm = "am";
    if (hour > 12){
      hour -= 12;
      ampm = "pm";
    }

    time_string = hour + ":" + minute + " " + ampm + " on ";
  }
  else{
    hour = 0;
    minute = 0;
  }


  var date_arr = fb_time[0].split("-");

  var year = Number(date_arr[0]);
  var month = Number(date_arr[1]);
  month -= 1;
  var date = Number(date_arr[2]);



  var js_date = new Date(year, month, date, hour, minute);


  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var month_word = months[month];

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var day_word = days[js_date.getDay()];

  var date_string = day_word + " " + month_word + " " + js_date.getDate() + ", " + js_date.getFullYear();

  return time_string + date_string;
}

function wrap_in_p_tag(s){
  if (typeof s == 'undefined'){
    s = "";
  }
  return "<p>" + s + "</p>"
}
