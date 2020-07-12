import axios from "axios";

// Перечень ошибок, которые мы будем обрабатывать
const Error = {
  UNAUTHORIZED: 401,
};

// Вызов createAPI будет возвращать новый инстас
// Принимает перехватчик onUnauthorized неавторизоованного состояния

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true, // чтобы читали куки
  });

  // в случае удачи
  const onSucces = (res) => res;

  // при ошибке
  const onFail = (err) => {
    const {response} = err;
    if (response.status === Error.UNAUTORIZED) { // Если не авторизован
      onUnauthorized(); // Нужен, чтобы изменить данные в сторе

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }

    throw err;
  };

  // Перехватчик
  api.interceptors.response.use(onSucces, onFail);

  return api;

};
