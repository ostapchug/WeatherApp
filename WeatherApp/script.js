var APID="";
var searchButton= document.getElementById("seachcity");
var locationButton= document.getElementById("getlocation");
var form = document.getElementById("form");

function getWeather(url, func) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	var data = JSON.parse(this.responseText);
        	func(data);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
          
}

function getCurrentWeather (data){

	//console.log(data);

	document.getElementById("cheader").innerText =`Current weather in ${data.name}, ${data.sys.country}`;
	document.getElementById("temperature").innerHTML = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'> ${Math.round(data.main.temp)}&#8451;`;
	document.getElementById("description").innerText = data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1);
	document.getElementById("dt").innerText = `${new Date(data.dt*1000).toString().substring(16,21)}  ${new Date(data.dt*1000).toString().substring(3,10)}`;
	document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
	document.getElementById("cloudiness").innerText = `${data.clouds.all} %`;
	document.getElementById("pressure").innerText = `${Math.round(data.main.pressure*0.750062)} mm Hg`;
	document.getElementById("humidity").innerText = `${data.main.humidity} %`;
	document.getElementById("sunrise").innerText = new Date(data.sys.sunrise*1000).toString().substring(16,21);
	document.getElementById("sunset").innerText = new Date(data.sys.sunset*1000).toString().substring(16,21);
	document.getElementById("coords").innerText = `Lat: ${data.coord.lat} | Long: ${data.coord.lon}`;

	document.getElementById("tabs").style.display="initial";
    document.getElementById("tips").style.display="none";
}

function getDailyWeather (data){

	var table="";

	//console.log(data);

    document.getElementById("dheader").innerText =`Daily weather and forecasts in ${data.city.name}, ${data.city.country}`;

    for(var i=0;i<data.list.length;i++){

    	if (!table.includes(new Date(data.list[i].dt*1000).toString().substring(0,15))){
    		if(new Date(data.list[i].dt*1000).getDate()==new Date(Date.now()).getDate()){
    			table += `<tr class='active'><th colspan='2'>${new Date(data.list[i].dt*1000).toString().substring(0,15)} Today</th></tr>`;
    			}else{
    				table += `<tr class='active'><th colspan='2'>${new Date(data.list[i].dt*1000).toString().substring(0,15)}</th></tr>`;
    				}
    	}

    	table += `<tr><td>${new Date (data.list[i].dt*1000).toString().substring(16,21)}<img src='http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png'></td>`+
                 `<td><span class='label label-default'>${Math.round(data.list[i].main.temp)}&#8451;</span>&nbsp;&nbsp;<i>${data.list[i].weather[0].description}</i>`+
                 `<p>${data.list[i].wind.speed} m/s, clouds: ${data.list[i].clouds.all}%, ${Math.round(data.list[i].main.pressure*0.750062)} mm Hg, humidity: ${data.list[i].main.humidity}%</p></td></tr>`;    
	}

            document.getElementById("dtable").innerHTML=table;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    searchButton.click();
});

searchButton.addEventListener("click", function(){
    var cityName = document.getElementById("cityname").value;
    getWeather(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APID}`, getCurrentWeather);
    getWeather(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APID}`, getDailyWeather); 
});

locationButton.addEventListener("click", function(){
	navigator.geolocation.getCurrentPosition(function(position) {
		getWeather(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APID}`, getCurrentWeather);
        getWeather(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APID}`, getDailyWeather);
    });
});

