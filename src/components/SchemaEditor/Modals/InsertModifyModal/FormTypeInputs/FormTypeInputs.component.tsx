import { DatabaseColumnInfo } from "@eco-flow/types";
import { DatePicker, Input, InputNumber, Panel, SelectPicker } from "rsuite";
import Editor from "@monaco-editor/react";
import React, { useEffect } from "react";

export default function FormTypeInputs({
  columnType,
  ...props
}: {
  columnType: DatabaseColumnInfo;
  [key: string]: any;
}) {
  switch (columnType.alias) {
    case "Text":
      return <Input {...props} />;
    case "Number":
      return <InputNumber {...props} />;
    case "Boolean":
      return (
        <SelectPicker
          searchable={false}
          data={[
            { label: "true", value: "1" },
            { label: "false", value: "0" },
          ]}
          onClean={() => props.onChange(null)}
          {...props}
        />
      );

    case "Date":
      return (
        <DatePicker
          placement="auto"
          format={
            columnType.actualData?.columnData?.dateTimeFormat === "datetime"
              ? "dd/MM/yyyy hh:mm aa"
              : columnType.actualData?.columnData?.dateTimeFormat === "time"
              ? "hh:mm:ss aa"
              : columnType.actualData?.columnData?.dateTimeFormat === "date"
              ? "dd/MM/yyyy"
              : "dd/MM/yyyy hh:mm aa"
          }
          {...props}
        />
      );

    case "Json":
      const { onChange } = props;
      const [jsonValue, setJsonValue] = React.useState({
        value: "{}",
        validate: true,
      });
      useEffect(() => onChange(jsonValue), [jsonValue]);
      return (
        <Panel bordered style={{ backgroundColor: "#1e1e1e" }}>
          <Editor
            options={{
              contextmenu: false,
              minimap: { enabled: false },
              quickSuggestions: false,
              suggest: {
                showProperties: false,
              },
              inlineSuggest: { enabled: false },
              fontSize: 16,
            }}
            wrapperProps={{ fontSize: 20 }}
            height={250}
            language="json"
            theme="vs-dark"
            value={jsonValue.value}
            defaultValue=""
            onChange={(val) => setJsonValue({ ...jsonValue, value: val! })}
            onValidate={(result) =>
              result.length === 0
                ? setJsonValue({ ...jsonValue, validate: true })
                : setJsonValue({ ...jsonValue, validate: false })
            }
          />
        </Panel>
      );

    default:
      return <Input {...props} />;
  }
}
