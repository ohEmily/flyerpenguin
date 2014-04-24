
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
  
}

function write_event_image(cover){
  if (typeof cover === 'undefined'){
    return;
  }
  else if (typeof cover.source === 'undefined'){
    return;
  }

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
    $(this).remove();
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
