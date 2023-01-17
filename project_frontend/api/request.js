import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const client = (() => {
  return axios.create({
    baseURL: "http://localhost:3000",
  });
})();

const request = async (options, catchError = true) => {
  const onSucces = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return error.response || error.message;
  };

  return catchError
    ? client(options).then(onSucces).catch(onError)
    : client(options).then(onSucces);
};

client.interceptors.request.use(
  (config) => {
    if (/users\/sign_in/.test(config.url)) {
      return config;
    } else {
      const bearer = cookies.get("auth_token");

      config.headers = {
        Authorization: "Bearer " + bearer,
      };
      return config;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
