import { ApiResponse } from "@ecoflow/types";
import userSignoutService from "../service/user/userSignout.service";

const logoutHandler = (setLogout: any) => {
  userSignoutService().then((response: ApiResponse) => {
    if (response.success) setLogout(true);
  });
};

export default logoutHandler;
