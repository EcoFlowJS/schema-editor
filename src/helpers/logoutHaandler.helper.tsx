import { ApiResponse } from "@eco-flow/types";
import userLougoutService from "../service/user/userSignout.service";

const logoutHandler = (setLogout: any) => {
  userLougoutService().then((response: ApiResponse) => {
    if (response.success) setLogout(true);
  });
};

export default logoutHandler;
