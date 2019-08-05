import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLocation, getWeather, getHourly, setUnits } from './actions/weather';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/Main';
import Hourly from './components/Hourly';
import Map from './components/Map';

class App extends Component {

  state = {
    view: "current",
    location: ""
  }

  componentWillMount() {
    if ("geolocation" in navigator) {
      console.log("Geolocation is available.");
      navigator.geolocation.getCurrentPosition((position) => {
          //console.log(position.coords);
          let location = { 
            lat: position.coords.latitude, 
            long: position.coords.longitude 
          };
          this.props.setLocation(location);
          this.props.getWeather(location, this.props.units, (name) => {
            this.setState({location: name});
          });
          this.props.getHourly(location, this.props.units);
      });
    } else {
        console.log("Geolocation is not available.")
    }
  }

  renderView = () => {
    switch(this.state.view) {
      case "current":
        return <Main />;
      case "hourly":
        return <Hourly />;
      case "map":
        return <Map />;
      default:
        return <Main />;
    }
  }

  renderNav = () => {
      const buttons = ["current", "hourly", "map"];

      return buttons.map(b => {
        return (
          <li key={b} className="nav-item mr-1">
            <button 
              className={this.state.view == b ? "nav-link active text-uppercase" : "nav-link text-uppercase"}
              value={b}>{b}
            </button>
          </li>
        )
      })
  }

  changeUnits = (e) => {
    this.props.setUnits(e.target.value);
    this.props.getWeather(this.props.location, e.target.value, () => {
      this.renderView();
    });
    this.props.getHourly(this.props.location, e.target.value);
  }

  changeView = (e) => {
    this.renderNav();
    this.setState({view: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="d-flex justify-content-between mt-2 mb-2">
            <h2>{this.state.location}</h2>
            <div onClick={this.changeUnits}>
              <button 
                className={this.props.units == "metric" ? "btn btn-secondary mr-2" : "btn btn-outline-secondary mr-2"}
                value="metric"
                >&#8451;</button>
              <button
                className={this.props.units == "imperial" ? "btn btn-secondary" : "btn btn-outline-secondary"}
                value="imperial"
                >&#8457;</button>
            </div>
          </div>
          <ul className="nav nav-tabs mt-2" onClick={this.changeView}>
              {this.renderNav()}
          </ul>
          {this.renderView()}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      units: state.weather.units,
      location: state.weather.defaultLoc
  };
}

export default connect(mapStateToProps, { setLocation, getWeather, getHourly, setUnits })(App);
