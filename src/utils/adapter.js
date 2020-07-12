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
    offers[item.city.name] = [];
  }

  // Создаём offer ы
  for (let i = 0; i < data.length; i++) {
    offer.id = data[i].id;
    offer.isPremium = data[i].is_premium;
    offer.isFavourite = data[i].is_favorite;
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
    offer.city.zoom = data[i].city.location.zoom;
    offer.city.coordinates = [data[i].city.location.latitude, data[i].city.location.longitude];
    offer.location = {};
    offer.location.zoom = data[i].location.zoom;

    // пушим их в созданные города
    offers[data[i].city.name].push(offer);
    offer = {};
  }
  console.log(offers);
  // Проверка на корректность
  // console.log(checkRightLength(data, offers));

  return offers;
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
