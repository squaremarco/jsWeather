$.domReady(function() {
	var degree = $("#degree-container");
	var weather = $("#weather-icon");
	var location = $("#location-container");
	var url = "http://api.openweathermap.org/data/2.5/weather?q=";
	var appid = "&APPID=50feb54f829ca887ab9b407e15e33a68";
	var metric = "&units=metric";
	var currentTemp = 0;
	var currentUnits = "C";
	var weatherEmoji = {
		"clear sky": "☀️",
		"few clouds": "🌤",
		"scattered clouds": "☁️",
		"broken clouds": "☁️",
		"shower rain": "🌧",
		"rain": "🌧",
		"snow": "❄️",
		"thunderstorm": "🌩",
		"mist": "🌫"
	};

	$.ajax({
		url: "http://ipinfo.io",
		type: "jsonp",
		success : function(data) {
			location.text(data.city + ", " + data.country);
			$.ajax({
				url: url + data.city + appid + metric,
				type: "jsonp",
				success: function(data) {
					currentTemp = data.main.temp;
					degree.text(currentTemp.toFixed(1) + "°");
					weather.text(weatherEmoji[data.weather[0].main.toLowerCase()]);
				}
			});
		}
	});

	//event binding to F/C buttons
	$(".unit-button").on("click", function(){
		console.log($(this));
		var thisVal = $(this).find("input").val();
		if(thisVal === "F" && thisVal !== currentUnits){
			currentTemp = currentTemp * 9 / 5 + 32;
			currentUnits = thisVal;
		}
		if(thisVal === "C" && thisVal !== currentUnits){
			currentTemp = (currentTemp - 32) * 5 / 9;
			currentUnits = thisVal;
		}
		degree.text(currentTemp.toFixed(1) + "°");
	});
});
