// Author: Illia Bondar
// Date: 5/16/2021
// Get Weather by Zipcode

var ZipRegex = /^\d{5}$/ //only 5 digits and nothing before and after
var zipCode;
var CorF;
var tempSign;
var errorMessage;

document.getElementById("getWeatherBtn").addEventListener("click", function (e) {
    // read user input to alter the API call to get the data we want "location and temp format"
    zipCode = document.getElementById("zipID")
    CorF = document.getElementById("dropDownCF")
    errorMessage = document.getElementById("errorMsg")


    // throw out an error message if the input does not match the format (regex)
    // only run the API function if the input matches the format
    if (!zipCode.value.match(ZipRegex)) {
        errorMessage.innerHTML = 'Please use only numbers for your zip code in format "12345".'
        errorMessage.style.color = "#ff4d4d";
        document.getElementById("zipID").style.backgroundColor = "#ff4d4d";
    }
    else if (zipCode.value.match(ZipRegex)){
        changeColorsBackFunc();

        // use C or F for temp
        if (CorF.value == "imperial") {
            tempSign = document.getElementById("fahrenheit").innerHTML
        } 
        else {
            tempSign = document.getElementById("celsius").innerHTML
        }

        APIandOutput();
    }

})

// removes error messages
function changeColorsBackFunc() {
    errorMessage.innerHTML = ''
    errorMessage.style.color = "gray";
    document.getElementById("zipID").style.backgroundColor = "whitesmoke";
}

// make the reset button also clear out the error
document.getElementById("resetBtn").addEventListener("click", function() {
    changeColorsBackFunc();
})

// do an API call to get data and pick out information needed
function APIandOutput() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=${CorF.value}&zip=${zipCode.value },us&appid=e4dab9c6ce4f8742acf80944b142dcff`)
        .then(function (e) {
            // output data that we got back
            document.getElementById("placeholder").innerHTML = "";
            document.getElementById("temperature").innerHTML = `Temperature: ${e.data.main.temp}${tempSign}`;
            document.getElementById("cityName").innerHTML = `City: ${e.data.name}`;
            document.getElementById("currConditions").innerHTML = `Conditions: ${e.data.weather[0].main}`;
            document.getElementById("conditionsIcon").src = `http://openweathermap.org/img/w/${e.data.weather[0].icon}.png`;
            changeColorsBackFunc()
        })
}