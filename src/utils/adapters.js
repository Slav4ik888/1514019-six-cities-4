/**
 * Адаптер - преобразует полученные данные в нужный нам формат
 * @param {array} data - принятый с сервера массив
 * @returns {object} offers - объект в нужном формате
 */

export const adapterCitiesData = (data) => {
  let offers = {};
  let offer = {};

  // Присваиваем города
  for (let item of data) {
    if (item.city.name) {
      offers[item.city.name] = [];
    }
  }

  // Создаём offer ы
  for (let i = 0; i < data.length; i++) {
    offer.id = data[i].id;
    offer.isPremium = data[i].is_premium;
    offer.isFavorite = data[i].is_favorite;
    offer.previewImage = data[i].preview_image;
    offer.pictures = data[i].images;
    offer.amenities = data[i].goods;
    offer.bedrooms = data[i].bedrooms;
    offer.maxGuestsNumber = data[i].max_adults;
    offer.description = data[i].description;
    offer.host = {};
    if (data[i].host.avatar_url[0] !== `/`) {
      offer.host.photo = `/` + data[i].host.avatar_url;
    } else {
      offer.host.photo = data[i].host.avatar_url;
    }
    offer.host.name = data[i].host.name;
    offer.host.super = data[i].host.is_pro;
    offer.host.id = data[i].host.id;
    offer.price = data[i].price;
    offer.rating = data[i].rating;
    offer.cardTitle = data[i].title;
    offer.offerType = data[i].type;
    offer.coordinates = [data[i].location.latitude, data[i].location.longitude];
    offer.city = {};
    offer.city.name = data[i].city.name;
    offer.city.zoom = data[i].city.location.zoom;
    offer.city.coordinates = [data[i].city.location.latitude, data[i].city.location.longitude];
    offer.location = {};
    offer.location.zoom = data[i].location.zoom;

    // пушим их в созданные города
    offers[data[i].city.name].push(offer);
    offer = {};
  }
  // console.log(offers);
  // Проверка на корректность
  // console.log(checkRightLength(data, offers));

  return offers;
};


/**
 * Адаптер - преобразует полученные данные в нужный нам формат
 * @param {array} data - принятый с сервера массив
 * @returns {array} comments - массив в нужном формате
 */

export const adapterCommentsData = (data) => {
  let comments = [];
  let comment = {};

  // Создаём comment ы
  for (let i = 0; i < data.length; i++) {
    comment.id = data[i].id;
    comment.user = {};
    comment.user.avatarUrl = data[i].user.avatar_url;
    comment.user.id = data[i].user.id;
    comment.user.isPro = data[i].user.is_pro;
    comment.user.name = data[i].user.name;
    comment.comment = data[i].comment;
    comment.date = new Date(data[i].date).getTime();
    comment.rating = data[i].rating;

    // пушим их в созданные города
    comments.push(comment);
    comment = {};
  }
  // console.log(offers);

  return comments;
};


/**
 * Адаптер - преобразует полученные данные в нужный нам формат
 * @param {array} data - принятый с сервера массив
 * @returns {array} Nearby - массив в нужном формате
 */

export const adapterNearbyData = (data) => {
  let nearbyOffers = [];
  let offer = {};


  // Создаём offer ы
  for (let i = 0; i < data.length; i++) {
    offer.id = data[i].id;
    offer.isPremium = data[i].is_premium;
    offer.isFavorite = data[i].is_favorite;
    offer.previewImage = data[i].preview_image;
    offer.pictures = data[i].images;
    offer.amenities = data[i].goods;
    offer.bedrooms = data[i].bedrooms;
    offer.maxGuestsNumber = data[i].max_adults;
    offer.description = data[i].description;
    offer.host = {};
    offer.host.photo = data[i].host.avatar_url;
    offer.host.name = data[i].host.name;
    offer.host.super = data[i].host.is_pro;
    offer.host.id = data[i].host.id;
    offer.price = data[i].price;
    offer.rating = data[i].rating;
    offer.cardTitle = data[i].title;
    offer.offerType = data[i].type;
    offer.coordinates = [data[i].location.latitude, data[i].location.longitude];
    offer.city = {};
    offer.city.name = data[i].city.name;
    offer.city.zoom = data[i].city.location.zoom;
    offer.city.coordinates = [data[i].city.location.latitude, data[i].city.location.longitude];
    offer.location = {};
    offer.location.zoom = data[i].location.zoom;

    // пушим их в созданные города
    nearbyOffers.push(offer);
    offer = {};
  }

  return nearbyOffers;
};

/**
 * Проверяем на кол-во принятых и отданных офферов
 * @param {array} a -
 * @param {object} b -
 * @returns {boolean}
 */

export const checkRightLength = (a, b) => {
  let sum = 0;

  for (let city in b) {
    if (Object.prototype.hasOwnProperty.call(b, city)) {
      sum += b[city].length;
    }
  }
  return sum === a.length;
};
