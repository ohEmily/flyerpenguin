function format_url(url)
{
	
}

$("#generate_button").click(function()
{
	var url = $("#url_field").val();

	var formatted_url = format_url(url);
	//alert(url);
	
	
	
	$("#text").text(url);
});