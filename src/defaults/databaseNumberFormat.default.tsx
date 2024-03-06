import { ItemDataType } from "rsuite/esm/@types/common";

const databaseNumberFormat: ItemDataType<unknown>[] = [
  { label: "integer (ex: 10)", value: "int" },
  {
    label: "big integer (ex: 123456789)",
    value: "bigInt",
  },
  { label: "decimal (ex: 2.22)", value: "dec" },
  { label: "float (ex: 3.33333333)", value: "float" },
];

export default databaseNumberFormat;
