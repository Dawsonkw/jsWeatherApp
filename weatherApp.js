//-----------------------------------
// Constants
//-----------------------------------

var LD = document.getElementById("LD");
var cT = document.getElementById("cT");
var curr = document.getElementById("curr");
var wBH = document.getElementById("wBH");
var n5D = document.getElementById("n5D");
var feelsLike = document.getElementById("feelsLike");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var hour1 = document.getElementById("hour1");
var hour2 = document.getElementById("hour2");
var hour3 = document.getElementById("hour3");
var hour4 = document.getElementById("hour4");
var hour5 = document.getElementById("hour5");
var hour6 = document.getElementById("hour6");
var cont1 = document.getElementById("cont1");
var cont2 = document.getElementById("cont2");
var cont3 = document.getElementById("cont3");
var cont4 = document.getElementById("cont4");
var cont5 = document.getElementById("cont5");
var d1D = document.getElementById("d1D")
var d1H = document.getElementById("d1H")
var d1L = document.getElementById("d1L")
var d2D = document.getElementById("d2D")
var d2H = document.getElementById("d2H")
var d2L = document.getElementById("d2L")
var d3D = document.getElementById("d3D")
var d3H = document.getElementById("d3H")
var d3L = document.getElementById("d3L")
var d4D = document.getElementById("d4D")
var d4H = document.getElementById("d4H")
var d4L = document.getElementById("d4L")
var d5D = document.getElementById("d5D")
var d5H = document.getElementById("d5H")
var d5L = document.getElementById("d5L")

//-----------------------------------
// Helper functions
//-----------------------------------

// Error Handler Fuction

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    };

// Geolocater function

var getWeather = function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            showWeather(lat, lon)
        })
    }
        else {
            window.alert("Could Not Find Location")
        }
};

// HTMl inserter functon

function poster(data){
    let currentWeather = data[0];
    let futureForecast = data[1];
    let fiveDay =  data[2] 
    
    LD.innerHTML = `${currentWeather.name} ${fiveDay.data[0].datetime}`
    cT.innerHTML = `The current temperature is: ${currentWeather.main.temp} &deg;F`; 
    feelsLike.innerHTML = `Feels Like: ${currentWeather.main.feels_like}&deg;F`
    pressure.innerHTML =`Pressure: ${currentWeather.main.pressure} mmHg`
    humidity.innerHTML = `Humidity: ${currentWeather.main.humidity}`;
    
    hour1.innerHTML = `${futureForecast.list[0].dt_txt} ${futureForecast.list[0].main.temp}&deg;F`
    hour2.innerHTML = `${futureForecast.list[1].dt_txt} ${futureForecast.list[1].main.temp}&deg;F` 
    hour3.innerHTML = `${futureForecast.list[2].dt_txt} ${futureForecast.list[2].main.temp}&deg;F`
    hour4.innerHTML = `${futureForecast.list[3].dt_txt} ${futureForecast.list[3].main.temp}&deg;F`
    hour5.innerHTML = `${futureForecast.list[4].dt_txt} ${futureForecast.list[4].main.temp}&deg;F`
    hour6.innerHTML = `${futureForecast.list[5].dt_txt} ${futureForecast.list[5].main.temp}&deg;F`

    d1D.innerHTML = `${fiveDay.data[1].datetime}`
    d1H.innerHTML = `High of ${fiveDay.data[1].high_temp}&deg;F`
    d1L.innerHTML = `Low of ${fiveDay.data[1].low_temp}&deg;F`

    d2D.innerHTML = `${fiveDay.data[2].datetime}`
    d2H.innerHTML = `High of ${fiveDay.data[2].high_temp}&deg;F`
    d2L.innerHTML = `Low of ${fiveDay.data[2].low_temp}&deg;F`
    
    d3D.innerHTML = `${fiveDay.data[3].datetime}`
    d3H.innerHTML = `High of ${fiveDay.data[3].high_temp}&deg;F`
    d3L.innerHTML = `Low of ${fiveDay.data[3].low_temp}&deg;F`
    
    d4D.innerHTML = `${fiveDay.data[4].datetime}`
    d4H.innerHTML = `High of ${fiveDay.data[4].high_temp}&deg;F`
    d4L.innerHTML = `Low of ${fiveDay.data[4].low_temp}&deg;F`
    
    d5D.innerHTML = `${fiveDay.data[5].datetime}`
    d5H.innerHTML = `High of ${fiveDay.data[5].high_temp}&deg;F`
    d5L.innerHTML = `Low of ${fiveDay.data[5].low_temp}&deg;F`

    console.log(data[0], data[1], data[2])  
}; 

// Button Hide

function buttonHide(hide) {
    hide.style.display = "none"
};

//-----------------------------------
// Fetch functions
//-----------------------------------

function showWeather(lat, lon) {
    Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=db2a2e306b16b3751408ba248cc59777&units=imperial`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=db2a2e306b16b3751408ba248cc59777&units=imperial&cnt=6`),
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&days=6&lat=${lat}&lon=${lon}&units=I&key=fdefa03053fd4bb0b5e86f47418fbe48`)])
        .then(responses => Promise.all(responses.map(response => response.json())))  
        .then(function(data){
            poster(data)
        })
       .catch(error => console.log(error))
    }
       

////////////////////////////////////////////////////////////////
//  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//  API key: db2a2e306b16b3751408ba248cc59777
//  Lat: 40.181959
//  Long: -105.103632
//
//  https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
//  api key = fdefa03053fd4bb0b5e86f47418fbe48
