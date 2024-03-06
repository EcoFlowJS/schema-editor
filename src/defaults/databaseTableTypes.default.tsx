import { PiTextTFill } from "react-icons/pi";
import { BsToggles } from "react-icons/bs";
import { TbJson, Tb123 } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { TbLink } from "react-icons/tb";
import { PiKeyFill } from "react-icons/pi";
import {
  DatabaseTableAlias,
  DatabaseTableTypes as DatabaseTypes,
} from "@eco-flow/types";

export interface DatabaseTableTypesConfig {
  icon: React.FC<React.HTMLAttributes<SVGElement>>;
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
    icon: Tb123,
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
