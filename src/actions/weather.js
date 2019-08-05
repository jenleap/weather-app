import axios from 'axios';
import moment from 'moment';
import { GET_WEATHER, SET_LOCATION, GET_HOURLY, SET_UNITS, SET_ERROR } from './types';

import { getWeatherImage, getTimeOfDay } from '../util/helpers';
import { apiKey } from '../util/config';

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const hourlyUrl = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = (location, units, callback) => dispatch => {
    axios.get(`${weatherUrl}?lat=${location.lat}&lon=${location.long}&units=${units}&appid=${apiKey}`)
        .then((res) => {
            callback(res.data.name);
            let weather = {
                locName: res.data.name,
                temp: Math.round(res.data.main.temp),
                high: Math.round(res.data.main.temp_max),
                low: Math.round(res.data.main.temp_min),
                label: res.data.weather[0].main,
                image: getWeatherImage(res.data.weather[0].description, moment(res.data.dt_txt).hour())
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
            console.log(moment(res.data.list[0].dt_txt).hour());
            let hourly = res.data.list.map(h => {
                return {
                    time: moment(h.dt_txt).format("dddd h:mm A"),
                    temp: Math.round(h.main.temp),
                    image: getWeatherImage(h.weather[0].description, moment(h.dt_txt).hour())
                }
            });
            let filteredHourly = res.data.list.filter(l => {
                return moment(l.dt_txt).hour() % 6 == 0;
            });
            let nextWeather = {
                timeOfDay: getTimeOfDay(moment(filteredHourly[0].dt_txt).hour()),
                day: moment(filteredHourly[0].dt_txt).format('dddd'),
                temp: Math.round(filteredHourly[0].main.temp),
                image: getWeatherImage(filteredHourly[0].weather[0].description, moment(filteredHourly[0].dt_txt).hour()),
                label: filteredHourly[0].weather[0].main
            }
            
            dispatch({
                type: GET_HOURLY,
                payload: {
                    hourly,
                    nextWeather
                }
            });
        })
        .catch((err) => {
            console.log(err)
        });
}

export const getWeatherLocation = (location, units, callback) => dispatch => {
    axios.get(`${weatherUrl}?q=${location}&units=${units}&appid=${apiKey}`)
        .then((res) => {
            dispatch({
                type: SET_ERROR,
                payload: ""
            });       
            let weather = {
                locName: res.data.name,
                temp: Math.round(res.data.main.temp),
                high: Math.round(res.data.main.temp_max),
                low: Math.round(res.data.main.temp_min),
                label: res.data.weather[0].main,
                image: getWeatherImage(res.data.weather[0].description, moment(res.data.dt_txt).hour())
            };
            dispatch({
                type: GET_WEATHER,
                payload: weather
            });
            callback(res.data.name);
            let location = {
                lat: res.data.coord.lat,
                long: res.data.coord.lon
            };
            dispatch({
                type: SET_LOCATION,
                payload: location
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERROR,
                payload: "Location not found."
            })
        });
};


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