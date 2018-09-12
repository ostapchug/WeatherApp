var APID="";
var searchButton= document.getElementById("seachcity");
function getWeather() {
    var xhttp = new XMLHttpRequest();
    var cityName = document.getElementById("cityname").value;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	var data = JSON.parse(this.responseText);
        	console.log(data);
        	document.getElementById("currentcity").innerText ="Weather in "+data.name;
            document.getElementById("weather").innerText = data.weather[0].description;
            document.getElementById("weathericon").src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
            document.getElementById("clouds").innerText = data.clouds.all;
            document.getElementById("temperature").innerText = Math.round(data.main.temp);
            document.getElementById("pressure").innerText = Math.round(data.main.pressure*0.750062);
            document.getElementById("wind").innerText = data.wind.speed;
            document.getElementById("humidity").innerText = data.main.humidity;

       }
    };
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid="+APID, true);
    xhttp.send(); 
}
searchButton.addEventListener("click", function(){
	getWeather();
});