import React, {createRef, PureComponent} from 'react';
import pt from 'prop-types';
import cl from 'classnames';
import {pageType} from '../../utils/const.js';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import L from 'leaflet';


class Maps extends PureComponent {
  constructor(props) {
    super(props);
    this._mapRef = createRef();
    this._renderMarker = this._renderMarker.bind(this);
    this._clearMap = this._clearMap.bind(this);
    this._map = null;

    this._zoom = 12;
    this._markers = []; // Массив для хранения маркеров выведенных на карту
  }

  componentDidMount() {
    const {activeCoords} = this.props;

    if (!this._mapRef.current) {
      return;
    }

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

    this._renderMarker();
  }


  componentWillUnmount() {
    this.map = null;
  }


  componentDidUpdate() {
    this._clearMap();
    const {activeCoords} = this.props;

    const city = activeCoords;

    this._map.setView(city, this._zoom);

    this._renderMarker();
  }


  _clearMap() {
    // Чистим карту если есть старые маркеры
    if (this._markers) {
      this._markers.forEach((item) => {
        this._map.removeLayer(item);
      });

      this._markers = [];
    }
  }

  _renderMarker() {
    const {offers, activeOffer} = this.props;

    const icon = L.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [27, 33]
    });
    // Выводим маркеры offers на карту
    if (offers) {
      offers.forEach((offer) => {
        let marker = L.marker(offer.coordinates, {icon});
        this._markers.push(marker); // Сохраняем маркер, чтобы потом удалить его
        this._map.addLayer(marker);

        // return (L
        //   .marker(offer.coordinates, {icon})
        //   .addTo(this._map)
        // );
      });
    }

    // Маркер активного activeOffer
    if (activeOffer) {
      const activeIcon = L.icon({
        iconUrl: `/img/pin-active.svg`,
        iconSize: [27, 33],
      });
      let marker = L.marker(activeOffer.coordinates, {icon: activeIcon});
      this._markers.push(marker);
      this._map.addLayer(marker);
    }
  }


  render() {
    const {type} = this.props;

    const mapClasses = cl(`map`,
        {[`property__map`]: type === pageType.OFFER},
        {[`cities__map`]: type === pageType.MAIN}
    );

    return (
      <section className={mapClasses}>
        <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
      </section>
    );
  }
}

Maps.propTypes = {
  type: pt.oneOf([pageType.MAIN, pageType.OFFER]).isRequired,
  offers: pt.arrayOf(
      pt.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCoords: pt.array.isRequired,
  activeOffer: pt.shape(offerPropTypes),
};


export default Maps;
