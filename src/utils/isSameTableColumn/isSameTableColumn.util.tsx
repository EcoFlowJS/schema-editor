import { DatabaseColumnInfo } from "@eco-flow/types";

const isSameTableColumn = (
  previousData: DatabaseColumnInfo | null,
  result: DatabaseColumnInfo
): boolean => {
  if (previousData === null) return false;
  if (
    previousData.actualData?.columnData?.columnName ===
      result.actualData?.columnData?.columnName &&
    previousData.actualData?.columnData?.dateTimeFormat ===
      result.actualData?.columnData?.dateTimeFormat &&
    previousData.actualData?.columnData?.defaultValue ===
      result.actualData?.columnData?.defaultValue &&
    previousData.actualData?.columnData?.notNull ===
      result.actualData?.columnData?.notNull &&
    previousData.actualData?.columnData?.numberFormat ===
      result.actualData?.columnData?.numberFormat &&
    previousData.actualData?.columnData?.textFormat ===
      result.actualData?.columnData?.textFormat &&
    previousData.alias === result.alias &&
    previousData.name === result.name &&
    previousData.type === result.type
  )
    return true;
  return false;
};

export default isSameTableColumn;
