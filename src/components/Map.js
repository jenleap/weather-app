import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';

import { apiKey } from '../util/config';

class Map extends Component {

    state = {
        map: null
    }

    componentDidMount() {
        let map = L.map('map').setView([this.props.location.lat, this.props.location.long], 5);
        this.setState({map: map}, () => {
            this.renderLayer("temp");
        })
    }

    onLayer = (e) => {
        this.renderLayer(e.target.value);
    }

    renderLayer = (layer) => {
        this.state.map.eachLayer(l => {
            this.state.map.removeLayer(l);
        });
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.state.map);
        L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?basemap=map&cities=true&appid={api_key}', {
            attribution: '&copy; Open Weather Map',
            id: 'temp',
            api_key: apiKey,
            layer: layer
        }).addTo(this.state.map);
    }


    render() {
        return (
            <div>
                <div className="mt-2 mb-2" onClick={this.onLayer}>
                    <button className="btn btn-light mr-2" value="clouds">Clouds</button>
                    <button className="btn btn-light mr-2" value="temp">Temperature</button>
                    <button className="btn btn-light mr-2" value="precipitation">Precipitation</button>
                </div>
                <div id="map"></div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hourly: state.weather.hourly,
        location: state.weather.defaultLoc
    };
}

export default connect(mapStateToProps)(Map);