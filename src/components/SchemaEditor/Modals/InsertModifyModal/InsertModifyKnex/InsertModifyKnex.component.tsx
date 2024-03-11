import React, { useEffect } from "react";
import { InsertModifyModalMode } from "../InsertModifyModal.component";
import { DatabaseColumnInfo, DatabaseTableAlias } from "@eco-flow/types";
import { Form, FormGroup } from "@eco-flow/components-lib";
import FormTypeInputs from "../FormTypeInputs/FormTypeInputs.component";
import { FlexboxGrid } from "rsuite";
import "./style.less";

interface InsertModifyKnexProps {
  mode: InsertModifyModalMode;
  defaultValue?: { [key: string]: any };
  columnInfo: DatabaseColumnInfo[];
  onChange?: (value: { [key: string]: any }) => void;
  onLoad?: () => void;
}

export default function InsertModifyKnex({
  mode = "insert",
  columnInfo,
  defaultValue = {},
  onChange = () => {},
  onLoad = () => {},
}: InsertModifyKnexProps) {
  if (mode === "insert") {
    defaultValue = {};
    columnInfo
      .map((col) => {
        defaultValue[col.name] = "";
        return col;
      })
      .filter((col) => col.alias === "Boolean" || col.alias === "Date")
      .map((col) => (defaultValue[col.name] = null));
  }

  if (mode === "edit") {
    const values = { ...defaultValue };
    Object.keys(defaultValue).forEach((key) => {
      const column = columnInfo.filter((col) => col.name === key)[0];
      switch (column.alias) {
        case "Text":
          values[key] = values[key] === null ? "" : values[key].toString();
          break;
        case "Json":
          values[key] = {
            value: values[key],
            validate: true,
          };
          break;
        case "Date":
          values[key] =
            values[key] === null
              ? null
              : column.actualData?.columnData?.dateTimeFormat === "time"
              ? new Date(
                  new Date().toDateString() + " " + values[key].toString()
                )
              : new Date(values[key].toString());
          break;
        default:
          values[key] = values[key] === null ? null : values[key].toString();
      }
    });
    defaultValue = values;
  }

  const [formValue, setFormValue] = React.useState(defaultValue);

  useEffect(onLoad, []);
  useEffect(() => onChange(formValue), [formValue]);
  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item>
          <Form
            className="insertForm"
            onChange={(value) => setFormValue({ ...formValue, ...value })}
            formDefaultValue={formValue}
            formValue={formValue}
          >
            {columnInfo.map((column, index) => (
              <FormGroup
                key={index}
                name={column.name}
                disabled={column.name === "_id"}
                placeholder={
                  column.name === "_id"
                    ? "Id will be assigned automatically"
                    : `Value for column ${column.name}`
                }
                label={`Value for column ${column.name}`}
                helperText={
                  column.actualData?.columnData?.notNull &&
                  (typeof column.actualData.columnData.defaultValue ===
                    "undefined" ||
                    column.actualData.columnData.defaultValue.toString().trim()
                      .length === 0)
                    ? "Required"
                    : ""
                }
                columnType={column}
                accepter={FormTypeInputs}
                autoComplete="off"
              />
            ))}
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
