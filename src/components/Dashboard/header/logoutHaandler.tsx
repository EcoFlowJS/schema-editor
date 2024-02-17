import userLougoutService from "../../../service/user/userLogout.servvice";

const logoutHandler = (setLogout: any) => {
  userLougoutService().then((response) => {
    if (response.success) setLogout(true);
  });
};

export default logoutHandler;
