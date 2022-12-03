const api = {
    key: 'ada9356beaf3783c86dab7f24ea42701',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
}

const elSearchInput = document.querySelector('.search-input');

elSearchInput.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(elSearchInput.value)
        console.log(elSearchInput.value)
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query} &units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector('.weather');
        weatherEl.innerHTML = weather.weather[0].main;

    let highLow = document.querySelector('.high-low')
        highLow.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`    
}

function dateBuilder(s) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octamber', 'November', "December"]
    let days = ['Monday', 'Tuesday', 'Wednesday', "Thursday", 'Friday', 'Saturday', 'Sunday'];
    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
}







