import { FormGroup } from "@ecoflow/components-lib";
import { DatabaseTableTypes } from "@ecoflow/types";
import { Checkbox, FlexboxGrid, InputNumber, SelectPicker } from "rsuite";
import databaseCreateEditModel from "../../../../../../defaults/databaseCreateEditModel.default";

interface AdvancedSettingsProps {
  type?: DatabaseTableTypes;
  formValue?: typeof databaseCreateEditModel;
}

export default function AdvancedSettings({
  type = "string",
}: AdvancedSettingsProps) {
  const CheckBox = ({ onChange, value, checkboxLabel, ...props }: any) => (
    <Checkbox
      checked={value}
      onChange={(_value, checked) => onChange(checked)}
      {...props}
    >
      {checkboxLabel}
    </Checkbox>
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
          borderRight: "1px solid var(--rs-divider-border)",
        }}
      >
        <FormGroup
          name="defaultValue"
          label="Default Value"
          helperText="Default Value for this column"
          autoComplete="off"
          placeholder="Default Value for this column"
          style={{ width: "100%" }}
          {...(type === "integer"
            ? {
                ...{
                  accepter: InputNumber,
                },
              }
            : type === "boolean"
            ? {
                ...{
                  accepter: Selectpicker,
                  data: [
                    {
                      label: "true",
                      value: "1",
                    },
                    {
                      label: "false",
                      value: "0",
                    },
                  ],
                  searchable: false,
                },
              }
            : { ...{} })}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        colspan={12}
        style={{
          padding: "1rem",
        }}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <FormGroup
              name="notNull"
              label=""
              checkboxLabel="Not Null"
              accepter={CheckBox}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
