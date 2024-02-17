import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initStatus = atom({
  isAuth: false,
  isNew: false,
  isLoggedIn: false,
  userID: undefined,
});

export const isLoggedOut = atomWithStorage("isLoggedOut", false);

export default initStatus;
