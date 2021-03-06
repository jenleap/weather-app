import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getWeather } from '../actions/weather';

class Main extends Component {

    state = {
        time: ''
    }

    componentWillMount() {
        let time = new Date();
        time = moment(time).format("dddd MMMM Do YYYY, h:mm:ss a");
        this.setState({time: time});
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
    }

    renderUnits = () => {
        if (this.props.units == "metric") {
            return <div>&#8451;</div>;
         } else {
            return <div>&#8457;</div>;
         }
    }

    render() {
        return (
            <div>
                <div className="text-uppercase mt-2 mb-4">Updated on {this.state.time}</div>
                <div className="row">
                    <div className="col-8 col-md-3 mb-5">
                        <div className="d-flex align-items-start">
                            <span id="currentTemp">{this.props.weather.temp}</span>
                            {this.renderUnits()}
                        </div>
                        <h4 className="text-center">{this.props.weather.label}</h4>
                    </div>
                    
                    <div className="col-4 col-md-2">
                        <div className="d-flex justify-content-between">
                            <span>High</span>
                            <div className="d-flex">
                                <span>{this.props.weather.high}</span>
                                {this.renderUnits()}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Low</span>
                            <div className="d-flex">
                                <span>{this.props.weather.low}</span>
                                {this.renderUnits()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 d-flex flex-column align-items-center border rounded bg-light ml-md-5 p-2">
                        <div className="text-uppercase">{this.props.nextWeather.timeOfDay}</div>
                        <div className="text-uppercase">{this.props.nextWeather.label}</div>
                        <img src={this.props.nextWeather.image} />
                        <div className="d-flex">
                            <span>{this.props.nextWeather.temp}</span>
                            {this.renderUnits()}
                        </div>

                    </div>
                </div>
                
               
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        weather: state.weather.weather,
        nextWeather: state.weather.nextWeather,
        location: state.weather.defaultLoc,
        units: state.weather.units
    };
}

export default connect(mapStateToProps, { getWeather })(Main);