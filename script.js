const api = {
  key: "a669beae060fcf2f04ae40b9cc31383a",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector("#city");
const btn = document.querySelector("#btn");
btn.addEventListener("click", getInput);

function getInput(e) {
  e.preventDefault();

  if (e.type == "click") {
    getData(city.value);
    console.log(city.value);
  }
}

function getData() {
  fetch(`${api.base}weather?q=${city.value}&units=metric&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayData);
}

function displayData(response) {
  // console.log(response);
  if (response.cod == "404") {
    const error = document.querySelector(".error");
    error.textContent = "Please enter a valid City";
    city.value = "";
  } else {
    const city = document.querySelector(".city-name");
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temperature");
    temp.innerText = `Temp: ${Math.round(response.main.temp)} °C`;

    const weather = document.querySelector(".weather");
    weather.innerText = `Weather: ${response.weather[0].main}`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range: ${Math.round(
      response.main.temp_min
    )} °C/ ${Math.round(response.main.temp_max)} °C`;
  }
}

function dateFunction(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date}, ${month}, ${year}`;
}
