import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import L from 'leaflet';

const withMap = (Component) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);
      this._mapRef = createRef();
      this._renderMap = this._renderMap.bind(this);
      this._map = null;

      this._zoom = 12;
      this._markers = []; // Массив для хранения маркеров выведенных на карту
    }

    componentDidMount() {
      this._renderMap();
    }

    componentWillUnmount() {
      this.map = null;
    }

    componentDidUpdate() {
      const {offers, activeCoords} = this.props;
      const icon = L.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      });

      if (this._markers) {
        this._markers.forEach((item) => {
          this._map.removeLayer(item);
        });

        this._markers = [];
      }

      const city = activeCoords;

      this._map.setView(city, this._zoom);

      offers.forEach((offer) => {
        let marker = L.marker(offer.coordinates, {icon});
        this._markers.push(marker);
        this._map.addLayer(marker);
      });
    }

    _renderMap() {
      const {offers, activeCoords} = this.props;

      if (!this._mapRef.current) {
        return;
      }

      const icon = L.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      });

      const city = activeCoords;

      // Инициализация карты
      this._map = L.map(this._mapRef.current, {
        center: city,
        zoom: this._zoom,
        zoomControl: false,
        marker: true
      });

      // Устанавливаем центр карты по координатам city
      this._map.setView(city, this._zoom);

      L
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this._map);

      offers.forEach((offer) => {
        let marker = L.marker(offer.coordinates, {icon});
        this._markers.push(marker);
        this._map.addLayer(marker);

        // return (L
        //   .marker(offer.coordinates, {icon})
        //   .addTo(this._map)
        // );
      });
    }
    render() {
      return <Component
        {...this.props}
        // activItem={this.state.activItemId}
        // onItemClick={this._handleItemClick}
      >
        <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
      </Component>;
    }
  }

  WithMap.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape(offerPropTypes).isRequired
    ).isRequired,
    activeCoords: PropTypes.array.isRequired,
  };

  return WithMap;
};

export default withMap;
