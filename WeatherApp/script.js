var APID="";
var searchButton= document.getElementById("seachcity");
var locationButton= document.getElementById("getlocation");

function getLocation () {
    navigator.geolocation.getCurrentPosition(function(position) {
        getWeather(position.coords.latitude, position.coords.longitude);
    });
}

function getWeather(a,b) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	var data = JSON.parse(this.responseText);
//        	console.log(data);

        	document.getElementById("currentcity").innerText ="Current weather in "+data.city.name+", "+data.city.country;
        	document.getElementById("dailycity").innerText ="Daily weather and forecasts in "+data.city.name+", "+data.city.country;

            var ctable="";
            var dtable="";

            for(var i=0;i<data.list.length;i++){

                    if (!dtable.includes(new Date(data.list[i].dt*1000).toString().substring(0,15))){
                        if(new Date(data.list[i].dt*1000).getDate()==new Date(Date.now()).getDate()){
                            dtable += "<tr class='active'><th colspan='2'>"+new Date(data.list[i].dt*1000).toString().substring(0,15)+" Today</th></tr>";

                        }else{
                            dtable += "<tr class='active'><th colspan='2'>"+new Date(data.list[i].dt*1000).toString().substring(0,15)+"</th></tr>";
                            }
                    }

                    dtable += "<tr><td>"+new Date (data.list[i].dt*1000).toString().substring(16,21)+
                    "<img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>"+
                    "<td><span class='label label-default'>"+Math.round(data.list[i].main.temp)+"&#8451;</span>"+"&nbsp;&nbsp;"+
                    "<i>"+data.list[i].weather[0].description+"</i>"+
                    "<p>"+data.list[i].wind.speed+" m/s, "+
                    "clouds: "+data.list[i].clouds.all+"%, "+
                    Math.round(data.list[i].main.pressure*0.750062)+" mm Hg, "+
                    "humidity: "+data.list[i].main.humidity+"%</p></td></tr>";

                    if(i==8){
                        ctable=dtable;
                    }
    
			    }

            document.getElementById("dtable").innerHTML=dtable;
            document.getElementById("ctable").innerHTML=ctable;

            document.getElementById("tabs").style.display="initial";
            document.getElementById("tips").style.display="none";

       }
    };

    if (arguments.length==2){
        xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?lat="+a+"&lon="+b+"&units=metric&appid="+APID, true);
        xhttp.send();
    }else{
            xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q="+a+"&units=metric&appid="+APID, true);
            xhttp.send();
    }
}

var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    searchButton.click();
  });

searchButton.addEventListener("click", function(){
    var cityName = document.getElementById("cityname").value;
    getWeather(cityName)    
});

locationButton.addEventListener("click", function(){
	getLocation();
});

