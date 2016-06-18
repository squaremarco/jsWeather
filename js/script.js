(function () {
	function getLocal() {
		return $.ajax({
			url: "http://ipinfo.io",
			type: "jsonp"
		});
	}

	function getWeather(city) {
		var url = "http://api.openweathermap.org/data/2.5/weather?q=";
		var appid = "&APPID=50feb54f829ca887ab9b407e15e33a68";
		var metric = "&units=metric";
		return $.ajax({
			url: url + city + appid + metric,
			type: "jsonp"
		});
	}

	function isDayTime() {
		var time = new Date().getHours();
		return time > 6 && time < 19;
	}

	function tempToWord(temp) {
		if (temp < 0) { return "freezing"; }
		if (temp >= 0 && temp < 18) { return "cold"; }
		if (temp >= 18 && temp < 26) { return "warm"; }
		if (temp >= 26) { return "hot"; }
	}

	$.domReady(function () {
		var degree = $("#degree-container");
		var weather = $("#weather-icon");
		var location = $("#location-container");
		var unitButton = $(".unit-button");

		var currentUnits = "C";
		var temperature = {
			C: 0,
			F: 0
		};

		//fire api requests
		getLocal().then(function (data) {
			var city = data.city;
			location.text(city + ", " + data.country);
			getWeather(city).then(function (data) {
				temperature.C = data.main.temp;
				temperature.F = temperature.C * 9 / 5 + 32;
				degree.addClass("degree-" + tempToWord(temperature.C));
				degree.text(Math.round(temperature.C) + "°");
				weather.find("i").addClass("wi-owm-" + (isDayTime() ? "day-" : "night-") + data.weather[0].id);
				weather.addClass(isDayTime() ? "weather-day" : "weather-night");
			});
		});

		//event binding to F/C buttons
		unitButton.on("click", function () {
			var thisVal = $(this).find("input").val();
			if (thisVal !== currentUnits) {
				degree.text(Math.round(temperature[thisVal]) + "°");
				currentUnits = thisVal;
			}
		});
	});
})();
