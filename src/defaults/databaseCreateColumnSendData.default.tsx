import { DatabaseCreateEditModel, DatabaseTableTypes } from "@ecoflow/types";

export interface DatabaseCreateColumnSendData {
  type?: DatabaseTableTypes;
  columnData?: DatabaseCreateEditModel;
}
const databaseCreateColumnSendData: DatabaseCreateColumnSendData = {};

export default databaseCreateColumnSendData;
