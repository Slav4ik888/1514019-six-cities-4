export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const showDate = (timestamp, format) => {

  const newDate = new Date(timestamp);
  const monthName = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

  const formatType = {
    monthYYYY: `Month YYYY`,
    yyyymmdd: `YYYY-MM-DD`,
  };

  switch (format) {
    case formatType.monthYYYY:
      return `${monthName[newDate.getMonth()]} ${newDate.getFullYear()}`;

    case formatType.yyyymmdd:
      let month = (`0` + (newDate.getMonth() + 1)).slice(-2);
      let day = (`0` + newDate.getDay()).slice(-2);
      return `${newDate.getFullYear()}-${month}-${day}`;

    default:
      return timestamp;
  }
};


/**
 * Перевод рейтинга из оценки от 0 до 5 в проценты
 * @param {Number} rating - Оценка (от 0 до 5, может быть дробным)
 * @return {String} Рейтинг в процентах (от 0 до 100%)
 */
export const getRating = (rating) => {
  return `${rating * 20}%`;
};


/**
 * Возвращаем массив предложений поблизости
 * @param {Array} arr - массив из объектов
 * @param {Number} quantity - количество предложений которое нужно вернуть
 * @param {Array} pattern - массив шаблон координат по отношению к которому производим проверку
 * @param {Boolean} type - pattern включит первым в списке или нет, то есть
 * выводить его СОВМЕСТНО с результатами поблизости, если true, то он будет под номером 0
 *
 * @return {Array} newArr - массив из тех же объектов, что пришли в arr
 */

// Возвращает расстояние между двумя точками коррдинат
const getDistance = (a, b) => {
  return Math.sqrt(Math.pow((b[0] - a[0]), 2) + Math.pow((b[1] - a[1]), 2));
};


export const getNearbyOffers = (arr, quantity, pattern, type) => {
  let newArr = [];
  let map = new Map();

  // Вычисляем расстояние между объектами и pattern
  for (let i = 0; i < arr.length; i++) {
    map.set(i, getDistance(pattern, arr[i].coordinates));
  }

  // Ищем минимальные значения
  let min;
  for (let tar = 0; tar <= quantity; tar++) {
    for (let key of map.keys()) {
      min = key;
      // Устанавливаем  min
      if (map.get(min) !== undefined) {
        break;
      }
    }

    // Начинаем поиск
    for (let key of map.keys()) {
      if (map.get(min) > map.get(key)) {
        min = key;
      }
    }

    // Если pattern не нужно выводить то отсекаем его
    if (!type) {
      if (map.get(min) !== 0) {
        newArr.push(arr[min]);
      }
    } else {
      newArr.push(arr[min]);
    }
    map.delete(min);
  }

  return newArr;
};
