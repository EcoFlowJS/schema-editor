import { atom } from "jotai";

const openInsertModifyModal = atom(false);
const editStructure = atom(false);
const tableList = atom<string[]>([]);
const databaseDatas = atom<
  {
    id: number;
    data: any;
  }[]
>([]);

export { openInsertModifyModal, tableList, editStructure, databaseDatas };
