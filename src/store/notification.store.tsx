import { atom } from "jotai";
import { PlacementType } from "rsuite/esm/toaster/ToastContainer";

export interface Notification {
  show?: boolean;
  header?: string;
  message?: string;
  placement?: PlacementType;
}

const errorNotification = atom<Notification>({ show: false });
const successNotification = atom<Notification>({ show: false });
const warningNotification = atom<Notification>({ show: false });

export { errorNotification, successNotification, warningNotification };
