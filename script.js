let form = document.querySelector("form");
let searchField = document.querySelector(".seachField");
let target = "New Delhi"
let dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let body = document.querySelector("body");
form.addEventListener("submit",function(e){
    // console.log(e);
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
});
async function fetchData(target){
    try{
    let url = `https://api.weatherapi.com/v1/current.json?key=0db29e81f7f34fa4826173838242901&q=${target}&aqi=no`;
    let response =await fetch(url);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let currentTemp = data.current.temp_c;
    let currentCondition = data.current.condition.text;
    let locationName = data.location.name;
    let localTime = data.location.localtime;
    let conditionEmoji = data.current.condition.icon;
    updateDOM(currentTemp,currentCondition,locationName,localTime,conditionEmoji);

    }
    catch(error){
        alert("Location Invalid !");
        // console.log(error);
    }
}

function updateDOM(currentTemp,currentCondition,locationName,localTime,conditionEmoji){
    let datetimeArr = localTime.split(" ");
    let date = datetimeArr[0];
    let time = datetimeArr[1];
    let dayNum = new Date(date).getDay(); //will give day number
    let day = dayArr[dayNum-1];
    let currentTempUI = document.querySelector(".temp");
    let conditionEmojiUI = document.querySelector(".weather_condition img");
    let currentConditionUI = document.querySelector(".weather_condition span");
    let locationNameUI = document.querySelector(".time_location p");
    let localTimeUI = document.querySelector(".time_location span");
    currentTempUI.innerText = `${currentTemp} °C`;
    conditionEmojiUI.src = conditionEmoji;
    locationNameUI.innerText = locationName;
    currentConditionUI.innerText = currentCondition;
    localTimeUI.innerText = `${time} | ${day} | ${date}`;
}

fetchData(target);