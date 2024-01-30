import { atom } from "jotai";

const databaseGetConnectionList = atom({ payload: [], count: 0 });

export { databaseGetConnectionList };
