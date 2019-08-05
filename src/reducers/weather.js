import { GET_WEATHER, SET_LOCATION, GET_HOURLY, SET_UNITS } from '../actions/types';

const INITIAL_STATE = {
    defaultLoc: '',
    weather: {},
    hourly: [],
    nextWeather: {},
    units: 'metric'
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weather: action.payload
            }
        case SET_LOCATION:
            return {
                ...state,
                defaultLoc: action.payload
            } 
        case GET_HOURLY:
            console.log(action.payload);
            return {
                ...state,
                hourly: action.payload.hourly,
                nextWeather: action.payload.nextWeather
            }
        case SET_UNITS:
            return {
                ...state,
                units: action.payload
            }
        default:
            return state;
    }
};