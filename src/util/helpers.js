export const getWeatherImage = (weather, time) => {
    let imageNum = "";
    let timeOfDay = "";
    switch(weather) {
        case "clear sky":
            imageNum = "01";
            break;
        case "few clouds":
            imageNum = "02";
            break;
        case "scattered clouds":
            imageNum = "03";
            break;
        case "overcast clouds":
            imageNum = "03";
            break;
        case "broken clouds":
            imageNum = "04";
            break;
        case "shower rain":
            imageNum = "09";
            break;
        case "rain":
            imageNum = "10";
            break;
        case "light rain":
            imageNum = "10";
            break;
        case "moderate rain":
            imageNum = "10";
            break;
        case "thunderstorm":
            imageNum = "11";
            break;
        case "snow":
            imageNum = "13";
            break;
        case "mist":
            imageNum = "50";
            break;
    }
   if (time < 6 || time > 20) {
       timeOfDay = "n";
   } else {
       timeOfDay = "d";
   }
    return `http://openweathermap.org/img/wn/${imageNum}${timeOfDay}@2x.png`;
};

export const getTimeOfDay = (time) => {
    switch(time) {
        case 0:
            return "overnight";
        case 6:
            return "morning";
        case 12:
            return "afternoon";
        case 18:
            return "evening";
    }
};