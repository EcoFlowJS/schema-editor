import { SetStateAction } from "react";
import { ItemDataType } from "rsuite/esm/@types/common";
import { Notification } from "../../../../store/notification.store";
import { Params } from "react-router-dom";
import getDatabaseData from "../../../../service/database/showDatabaseData.service";
import dataProcessor from "./dataProcessor";

const fetchSubDocumenet = async (
  urlParams: Readonly<Params<string>>,
  documentID: string,
  collectonKey: string,
  errorNotification: (SetAtom: SetStateAction<Notification>) => void
): Promise<ItemDataType[]> => {
  const { id, collectonORtable } = urlParams;
  try {
    return dataProcessor(
      (await getDatabaseData(id!, collectonORtable!, documentID, collectonKey))
        .payload.data[0],
      collectonKey
    );
  } catch (err) {
    errorNotification({
      show: true,
      header: "Error fetching",
      message: "Error fetching documenet data",
    });
    return [];
  }
};

export default fetchSubDocumenet;
