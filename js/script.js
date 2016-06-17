$.domReady(function() {
	var degree = $("#degree-container");
	var weather = $("#weather-icon");
	var location = $("#location-container");

	var celsius = 0;
	var fahrenheit = 0;
	var currentUnits = "C";

	var weatherEmoji = {
		"clear": "☀️",
		"clouds": "⛅️",
		"rain": "🌧",
		"drizzle": "🌧",
		"snow": "❄️",
		"thunderstorm": "🌩",
		"atmosphere": "🌫",
		"extreme": "🌪"
	};

	function getLocal(){
		return $.ajax({
			url: "http://ipinfo.io",
			type: "jsonp"
		});
	}

	function getWeather(city){
		var url = "http://api.openweathermap.org/data/2.5/weather?q=";
		var appid = "&APPID=50feb54f829ca887ab9b407e15e33a68";
		var metric = "&units=metric";
		return $.ajax({
			url: url + city + appid + metric,
			type: "jsonp"
		});
	}

	getLocal().then(function(data){
		var city = data.city;
		location.text(city + ", " + data.country);
		getWeather(city).then(function(data){
			celsius = data.main.temp;
			fahrenheit = celsius * 9 / 5 + 32;
			degree.text(Math.round(celsius) + "°");
			weather.text(weatherEmoji[data.weather[0].main.toLowerCase()]);
		});
	});

	//event binding to F/C buttons
	$(".unit-button").on("click", function(){
		var thisVal = $(this).find("input").val();
		if(thisVal !== currentUnits){
			if(thisVal === "F"){
				degree.text(Math.round(fahrenheit) + "°");
				currentUnits = "F";
			} else {
				degree.text(Math.round(celsius) + "°");
				currentUnits = "C";
			}
		}
	});
});
