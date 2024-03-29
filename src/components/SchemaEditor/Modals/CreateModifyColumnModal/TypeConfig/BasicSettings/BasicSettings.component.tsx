import { FormGroup } from "@ecoflow/components-lib";
import { FlexboxGrid } from "rsuite";
import { DatabaseTableTypes } from "@ecoflow/types";
import databaseNumberFormat from "../../../../../../defaults/databaseNumberFormat.default";
import databaseDateTimeFormat from "../../../../../../defaults/databaseDateTimeFormat.default";
import databaseCreateEditModel from "../../../../../../defaults/databaseCreateEditModel.default";
import SelectTextFormat from "./SelectTextFormat/SelectTextFormat.component";
import "./style.less";
import SelectPicker from "./SelectPicker/SelectPicker.component";

interface BasicSettingsProps {
  type?: DatabaseTableTypes;
  formValue?: typeof databaseCreateEditModel;
}

export default function BasicSettings({ type = "string" }: BasicSettingsProps) {
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
              accepter={SelectPicker}
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
              accepter={SelectPicker}
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
