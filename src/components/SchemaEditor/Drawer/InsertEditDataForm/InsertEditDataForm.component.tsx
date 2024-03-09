import { Form, FormGroup } from "@eco-flow/components-lib";
import { DatabaseDataResult } from "@eco-flow/types";
import React, { useEffect } from "react";
import {
  DatePicker,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  SelectPicker,
} from "rsuite";

interface InsertEditDataFormProps extends FormProps {
  ref?: React.Ref<FormInstance>;
  columnInfo: DatabaseDataResult["columns"];
  onLoad?: (defaultValue: any) => void;
  mode?: "insert" | "update";
}

export default function InsertEditDataForm({
  columnInfo,
  layout = "horizontal",
  formDefaultValue,
  onLoad = () => {},
  onChange = () => {},
  mode = "insert",
  ...props
}: InsertEditDataFormProps) {
  const defaultValue = formDefaultValue
    ? { ...formDefaultValue }
    : Object.create({});
  columnInfo?.map((columnn) => {
    if (
      columnn.type === "datetime" &&
      typeof defaultValue[columnn.name] !== "undefined"
    )
      defaultValue[columnn.name] = new Date(defaultValue[columnn.name]);

    if (typeof defaultValue[columnn.name] === "undefined")
      defaultValue[columnn.name] = null;

    if (
      defaultValue[columnn.name] === null &&
      (columnn.type === "string" || columnn.type === "integer")
    )
      defaultValue[columnn.name] = "";
  });

  useEffect(
    () =>
      onLoad(
        mode === "update"
          ? { oldData: defaultValue, newData: defaultValue }
          : defaultValue
      ),
    []
  );

  return (
    <Form
      layout={layout}
      onChange={(
        formValue: Record<string, any>,
        event?: React.SyntheticEvent<Element, Event> | undefined
      ) => {
        mode === "update"
          ? onChange({ oldData: defaultValue, newData: formValue }, event)
          : onChange(formValue, event);
      }}
      formDefaultValue={{ ...defaultValue }}
      {...props}
    >
      {columnInfo!.map((column, index) => {
        return (
          <>
            <FormGroup
              key={index}
              name={column.name}
              label={`${column.name} :`}
              accepter={
                column.name !== "_id"
                  ? column.type === "integer"
                    ? InputNumber
                    : column.type === "string"
                    ? Input
                    : column.type === "boolean"
                    ? SelectPicker
                    : column.type === "datetime"
                    ? DatePicker
                    : Input
                  : Input
              }
              style={{ width: 300 }}
              disabled={column.name === "_id"}
              helperText={
                column.name === "_id"
                  ? "id is generated automatically and cannot be modified."
                  : ""
              }
              helperTextStyle={{ marginLeft: 240 }}
              dir={column.name === "_id" ? "rtl" : "ltr"}
              data={
                column.name !== "_id"
                  ? column.type === "boolean"
                    ? [
                        {
                          label: "true",
                          value: 1,
                        },
                        {
                          label: "false",
                          value: 0,
                        },
                      ]
                    : undefined
                  : undefined
              }
              autoComplete={
                column.name !== "_id"
                  ? column.type === "integer" || column.type === "string"
                    ? "off"
                    : undefined
                  : undefined
              }
              searchable={
                column.name !== "_id"
                  ? column.type === "boolean"
                    ? false
                    : undefined
                  : undefined
              }
              format={
                column.name !== "_id"
                  ? column.type === "datetime"
                    ? "yyyy-MM-dd HH:mm:ss"
                    : undefined
                  : undefined
              }
              placement={
                column.name !== "_id"
                  ? column.type === "datetime"
                    ? "topStart"
                    : undefined
                  : undefined
              }
              placeholder={
                column.name !== "_id"
                  ? column.type === "string" || column.type === "integer"
                    ? column.name
                    : undefined
                  : undefined
              }
            />
          </>
        );
      })}
    </Form>
  );
}
