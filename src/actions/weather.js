import axios from 'axios';
import moment from 'moment';
import { GET_WEATHER, SET_LOCATION, GET_HOURLY, SET_UNITS } from './types';

import { getWeatherImage } from '../util/helpers';
import { apiKey } from '../util/config';

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const hourlyUrl = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = (location, units, callback) => dispatch => {
    axios.get(`${weatherUrl}?lat=${location.lat}&lon=${location.long}&units=${units}&appid=${apiKey}`)
        .then((res) => {
            console.log(res.data);
            callback(res.data.name);
            let weather = {
                locName: res.data.name,
                temp: Math.round(res.data.main.temp),
                high: Math.round(res.data.main.temp_max),
                low: Math.round(res.data.main.temp_min),
                label: res.data.weather[0].main,
                image: getWeatherImage(res.data.weather[0].description)
            };
            dispatch({
                type: GET_WEATHER,
                payload: weather
            });
        })
        .catch((err) => {
            console.log(err)
        });
};

export const getHourly = (location, units) => dispatch => {
    axios.get(`${hourlyUrl}?lat=${location.lat}&lon=${location.long}&units=${units}&appid=${apiKey}`)
        .then((res) => {
            console.log(res.data.list);
            let hourly = res.data.list.map(h => {
                return {
                    time: moment(h.dt_txt).format("dddd h:mm A"),
                    temp: Math.round(h.main.temp),
                    image: getWeatherImage(h.weather[0].description)
                }
            });
            console.log(hourly);
            dispatch({
                type: GET_HOURLY,
                payload: hourly
            });
        })
        .catch((err) => {
            console.log(err)
        });
}

export const setLocation = (location) => {
    return {
        type: SET_LOCATION,
        payload: location
    }
}

export const setUnits = (units) => {
    return {
        type: SET_UNITS,
        payload: units
    }
}