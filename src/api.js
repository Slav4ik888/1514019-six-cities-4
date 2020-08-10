import axios from "axios";

// Перечень ошибок, которые мы будем обрабатывать
const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

// Вызов createAPI будет возвращать новый инстас
// Принимает перехватчик onUnauthorized неавторизоованного состояния

export const createAPI = (onError) => {
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
    // console.log('response: ', response);
    switch (response.status) {
      case Error.UNAUTHORIZED:
        // console.log(`API onUnauthorized 401`);
        onError(401); // Нужен, чтобы изменить данные в сторе

        // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
        // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
        throw err;

      case Error.BAD_REQUEST:
        // console.log(`API Bad request 400`);
        onError(400);
        throw err;
    }

    // console.log(`api error необработанная`, response);
    throw err;
  };

  // Перехватчик ошибки, чтобы смогли её обработать
  api.interceptors.response.use(onSucces, onFail);

  return api;

};
