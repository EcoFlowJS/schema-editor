import { atom } from "jotai";

const openInsertModifyModal = atom(false);
const editStructure = atom(false);
const tableList = atom<string[]>([]);

export { openInsertModifyModal, tableList, editStructure };
