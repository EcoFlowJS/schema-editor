import { DatabaseCreateEditModel, DatabaseTableTypes } from "@eco-flow/types";

export interface DatabaseCreateColumnSendData {
  type?: DatabaseTableTypes;
  columnData?: DatabaseCreateEditModel;
}
const databaseCreateColumnSendData: DatabaseCreateColumnSendData = {};

export default databaseCreateColumnSendData;
