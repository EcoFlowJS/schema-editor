import { DatabaseTableAlias, DatabaseTableTypes } from "@ecoflow/types";

const processDatabaseTypeAlias = (
  type: DatabaseTableTypes
): DatabaseTableAlias | null => {
  switch (type) {
    case "boolean":
      return "Boolean";
    case "integer":
      return "Number";
    case "string":
      return "Text";
    case "datetime":
      return "Date";
    case "json":
      return "Json";
    default:
      return null;
  }
};

export default processDatabaseTypeAlias;
