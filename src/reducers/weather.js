import { GET_WEATHER, SET_LOCATION, GET_HOURLY, SET_UNITS } from '../actions/types';

const INITIAL_STATE = {
    defaultLoc: '',
    weather: {
        locName: '',
        temp: '',
        high: '',
        low: '',
        description: '',
        hourly: ''
    },
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
            return {
                ...state,
                hourly: action.payload
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