import { PiTextTFill } from "react-icons/pi";
import { BsToggles } from "react-icons/bs";
import { TbJson, Tb123 } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { TbLink } from "react-icons/tb";
import { PiKeyFill } from "react-icons/pi";
import { DatabaseTableTypes as DatabaseTypes } from "@eco-flow/types";

export interface DatabaseTableTypesConfig {
  icon: React.FC<React.HTMLAttributes<SVGElement>>;
  name: string;
  hint: string;
  type: DatabaseTypes;
}

const databaseTableTypes: DatabaseTableTypesConfig[] = [
  {
    type: "string",
    name: "Text",
    hint: "Small or long text like string",
    icon: PiTextTFill,
  },
  {
    type: "integer",
    name: "Number",
    hint: "Numbers (integer, decimal,floating point)",
    icon: Tb123,
  },
  {
    type: "boolean",
    name: "Boolean",
    hint: "yes or no, true or false",
    icon: BsToggles,
  },
  {
    type: "datetime",
    name: "Date",
    hint: "A date picker with hours, minutes and seconds",
    icon: SlCalender,
  },
  {
    type: "json",
    name: "Json",
    hint: "Data in JSON format",
    icon: TbJson,
  },
  {
    type: "foreign",
    name: "Foreign Key",
    hint: "Refers to a Table",
    icon: TbLink,
  },
];

export default databaseTableTypes;
