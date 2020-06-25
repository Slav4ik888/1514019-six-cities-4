import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import leaflet from 'leaflet';


class MapCity extends PureComponent {
  constructor(props) {
    super(props);
    this._mapRef = createRef();
    this._initMap = this._initMap.bind(this);
  }

  componentDidMount() {
    this._initMap();
  }

  componentWillUnmount() {}

  _initMap() {
    const {offers} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const city = [52.38333, 4.9];

    const zoom = 12;

    const map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.forEach((offer) =>
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(map)
    );
  }


  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

MapCity.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
};

export default MapCity;
