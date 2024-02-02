import { atom } from "jotai";

const initStatus = atom({
  isAuth: false,
  isNew: false,
  isLoggedIn: false,
  userID: undefined,
});

export default initStatus;
