import { atom } from "jotai";

const openDrawer = atom(false);
const tableList = atom<string[]>([]);

export { openDrawer, tableList };
