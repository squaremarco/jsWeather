$.domReady(function() {
	var degree = $("#degree-container");
	var weather = $("#weather-icon > i");
	var location = $("#location-container");

	var currentUnits = "C";
	var temperature = {
		C: 0,
		F: 0
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

	function isDayTime(){
		var time = new Date().getHours();
		return time > 6 && time < 19;
	}


	getLocal().then(function(data){
		var city = data.city;
		location.text(city + ", " + data.country);
		getWeather(city).then(function(data){
			temperature.C = data.main.temp;
			temperature.F = temperature.C * 9 / 5 + 32;
			degree.text(Math.round(temperature.C) + "°");
			weather.addClass("wi-owm-" + (isDayTime() ? "day-" : "night-") + data.weather[0].id);
		});
	});

	//event binding to F/C buttons
	$(".unit-button").on("click", function(){
		var thisVal = $(this).find("input").val();
		if(thisVal !== currentUnits){
			degree.text(Math.round(temperature[thisVal]) + "°");
			currentUnits = thisVal;
		}
	});
});
