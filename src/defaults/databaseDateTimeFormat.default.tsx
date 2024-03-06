import { ItemDataType } from "rsuite/esm/@types/common";

const databaseDateTimeFormat: ItemDataType<unknown>[] = [
  { label: "date (ex: 01/01/2024)", value: "date" },
  { label: "time (ex: 00:00 AM)", value: "time" },
  { label: "datetime (ex: 01/01/2024 00:00 AM)", value: "dateTime" },
];

export default databaseDateTimeFormat;
