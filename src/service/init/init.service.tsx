import _ from "lodash";
import axios from "../../utils/axios/axios";
import wrapPromise from "../../utils/suspense/wrapPromise";

const promise = new Promise<any>(async (resolve, reject) => {
  try {
    let result = {
      isAuth: false,
      isNew: false,
      isLoggedIn: false,
      userID: undefined,
    };
    const res = (await axios.get("init/status")).data;
    result.isAuth = res.isAuth;

    if (!res.isAuth) {
      if (_.has(res, "getAccessToken"))
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.getAccessToken}`;
      result.isLoggedIn = true;
      result.userID = res.userID;
    }

    if (res.isAuth && res.isNewClient) result.isNew = true;

    if (res.isAuth && !res.isNewClient)
      try {
        if ((await axios.get("auth/users/isAuthenticated")).data.success) {
          result.isLoggedIn = true;
          //To-Do: get user information;
        }
      } catch {
        result.isLoggedIn = false;
      }

    setTimeout(() => resolve(result), 200);
  } catch (err) {
    reject({ error: true, code: 504, payload: err });
  }
});

export default wrapPromise(promise);
