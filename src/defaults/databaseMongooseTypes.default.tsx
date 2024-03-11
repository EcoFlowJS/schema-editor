import { CollectionTypes } from "@eco-flow/types";
import { ItemDataType } from "rsuite/esm/@types/common";

const databaseMongooseTypes: ItemDataType<CollectionTypes>[] = (
  [
    "objectId",
    "array",
    "binData",
    "bool",
    "javascriptWithScope",
    "date",
    "decimal",
    "double",
    "int",
    "long",
    "maxKey",
    "minKey",
    "null",
    "object",
    "regex",
    "string",
    "symbol",
    "timestamp",
  ] as CollectionTypes[]
).map((type: CollectionTypes) => {
  return {
    label: type,
    value: type,
  };
});

export default databaseMongooseTypes;
