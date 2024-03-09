import React from "react";
import { InsertModifyModalMode } from "../InsertModifyModal.component";
import { DatabaseColumnInfo } from "@eco-flow/types";

interface InsertModifyMongoProps {
  mode: InsertModifyModalMode;
  defaultValue?: { [key: string]: any };
  columnInfo: DatabaseColumnInfo[];
  onChange?: (value: { [key: string]: any }) => void;
  onLoad?: () => void;
}

export default function InsertModifyMongo({}: InsertModifyMongoProps) {
  return <div>InsertModifyMongo</div>;
}
