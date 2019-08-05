import React, { Component } from 'react';
import { connect } from 'react-redux';


class Hourly extends Component {
    renderUnits = () => {
        if (this.props.units == "metric") {
            return <span>&#8451;</span>;
         } else {
            return <span>&#8457;</span>;
         }
    }

    render() {
        return (
            <div>
                <ul class="list-group mt-2">
                {this.props.hourly.map(h => {
                    return (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div className="col-4">{h.time}</div>
                            <div>
                                <span>{h.temp}</span>
                                {this.renderUnits()}
                            </div>
                            <img src={h.image} />
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hourly: state.weather.hourly,
        units: state.weather.units
    };
}

export default connect(mapStateToProps)(Hourly);