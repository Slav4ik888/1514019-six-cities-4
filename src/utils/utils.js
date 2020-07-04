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
