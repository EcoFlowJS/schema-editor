import { ItemDataType } from "rsuite/esm/internals/types";

const databaseDateTimeFormat: ItemDataType<unknown>[] = [
  { label: "date (ex: 01/01/2024)", value: "date" },
  { label: "time (ex: 00:00 AM)", value: "time" },
  { label: "datetime (ex: 01/01/2024 00:00 AM)", value: "datetime" },
];

export default databaseDateTimeFormat;
