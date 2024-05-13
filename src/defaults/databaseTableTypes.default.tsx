import { PiTextTFill } from "react-icons/pi";
import { BsToggles } from "react-icons/bs";
import { TbJson, TbNumber123 } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import {
  DatabaseTableAlias,
  DatabaseTableTypes as DatabaseTypes,
} from "@ecoflow/types";
import { FC, HTMLAttributes } from "react";

export interface DatabaseTableTypesConfig {
  icon: FC<HTMLAttributes<SVGElement>>;
  name: string;
  hint: string;
  type: DatabaseTypes;
  alias: DatabaseTableAlias;
}

const databaseTableTypes: DatabaseTableTypesConfig[] = [
  {
    type: "string",
    name: "Text",
    hint: "Small or long text like string",
    icon: PiTextTFill,
    alias: "Text",
  },
  {
    type: "integer",
    name: "Number",
    hint: "Numbers (integer, decimal,floating point)",
    icon: TbNumber123,
    alias: "Number",
  },
  {
    type: "boolean",
    name: "Boolean",
    hint: "yes or no, true or false",
    icon: BsToggles,
    alias: "Boolean",
  },
  {
    type: "datetime",
    name: "Date",
    hint: "A date picker with hours, minutes and seconds",
    icon: SlCalender,
    alias: "Date",
  },
  {
    type: "json",
    name: "Json",
    hint: "Data in JSON format",
    icon: TbJson,
    alias: "Json",
  },
];

export default databaseTableTypes;
