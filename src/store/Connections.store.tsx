import { atom } from "jotai";

const createConnectionDrawerOpenClose = atom(false);
const editConnectionDrawerOpenClose = atom(false);
const editConnectionName = atom("");
const databaseGetConnectionList = atom({ payload: [], count: 0 });

export {
  createConnectionDrawerOpenClose,
  editConnectionDrawerOpenClose,
  editConnectionName,
  databaseGetConnectionList,
};
