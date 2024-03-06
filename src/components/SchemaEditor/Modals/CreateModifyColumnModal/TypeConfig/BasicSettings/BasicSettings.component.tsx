import { FormGroup, IconWrapper } from "@eco-flow/components-lib";
import React from "react";
import { FlexboxGrid, RadioTile, RadioTileGroup, SelectPicker } from "rsuite";
import { PiTextTFill } from "react-icons/pi";
import "./style.less";
import { DatabaseTableTypes } from "@eco-flow/types";
import databaseNumberFormat from "../../../../../../defaults/databaseNumberFormat.default";
import databaseDateTimeFormat from "../../../../../../defaults/databaseDateTimeFormat.default";
import databaseCreateEditModel from "../../../../../../defaults/databaseCreateEditModel.default";

interface BasicSettingsProps {
  type?: DatabaseTableTypes;
  formValue?: typeof databaseCreateEditModel;
}

export default function BasicSettings({ type = "string" }: BasicSettingsProps) {
  const SelectTextFormat = ({ ...props }: any) => (
    <RadioTileGroup defaultValue="varchar" {...props}>
      <RadioTile
        icon={<IconWrapper icon={PiTextTFill} />}
        label="Short text"
        value="varchar"
      >
        Best for titles, names, links (URL). It create a field with
        varchar(255).
      </RadioTile>
      <RadioTile
        icon={<IconWrapper icon={PiTextTFill} />}
        label="Long text"
        value="text"
      >
        Best for descriptions, biography. It create a field with TEXT.
      </RadioTile>
    </RadioTileGroup>
  );

  const Selectpicker = ({ name, onChange, ...props }: any) => (
    <SelectPicker
      name={name}
      onChange={onChange}
      onClean={() => {
        onChange(null);
      }}
      {...props}
    />
  );

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item
        colspan={12}
        style={{
          padding: "1rem",
        }}
      >
        <FormGroup
          name="columnName"
          label="Name"
          autoComplete="off"
          helperText="No special character is allowed for the name of the attribute"
          style={{ width: "100%" }}
          placeholder="Name"
        />
      </FlexboxGrid.Item>
      {type === "string" || type === "integer" || type === "datetime" ? (
        <FlexboxGrid.Item
          colspan={12}
          style={{
            padding: "1rem",
            borderLeft: "1px solid var(--rs-divider-border)",
          }}
        >
          {type === "string" ? (
            <FormGroup name="textFormat" label="" accepter={SelectTextFormat} />
          ) : (
            <></>
          )}

          {type === "integer" ? (
            <FormGroup
              name="numberFormat"
              label="Number format"
              accepter={Selectpicker}
              placeholder="Choose here"
              data={databaseNumberFormat}
              style={{ width: "100%" }}
              searchable={false}
            />
          ) : (
            <></>
          )}

          {type === "datetime" ? (
            <FormGroup
              name="dateTimeFormat"
              label="Type"
              accepter={Selectpicker}
              placeholder="Choose here"
              data={databaseDateTimeFormat}
              style={{ width: "100%" }}
              searchable={false}
            />
          ) : (
            <></>
          )}
        </FlexboxGrid.Item>
      ) : (
        <></>
      )}
    </FlexboxGrid>
  );
}
