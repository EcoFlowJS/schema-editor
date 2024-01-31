import axios from "axios";

const instance = axios.create({ withCredentials: true });

instance.defaults.baseURL = "http://localhost:4000/systemApi/";
instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const response = await instance.patch(
        "auth/users/refreshToken",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["payload"]}`;

        return instance(error.config);
      }
    }
    return error;
  }
);

export default instance;
