import { useEffect, useState } from "react";
import { Form, Panel, Tabs } from "rsuite";
import { DatabaseTableTypesConfig } from "../../../../../defaults/databaseTableTypes.default";
import BasicSettings from "./BasicSettings/BasicSettings.component";
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings.component";
import databaseCreateEditModel from "../../../../../defaults/databaseCreateEditModel.default";
import { DatabaseCreateEditModel } from "@ecoflow/types";

interface TypeConfigProps {
  config: DatabaseTableTypesConfig;
  onChange?: (formValue: typeof databaseCreateEditModel) => void;
  defaultValue?: DatabaseCreateEditModel;
}

export default function TypeConfig({
  config,
  onChange = () => {},
  defaultValue,
}: TypeConfigProps) {
  const [formData, setFormData] = useState(databaseCreateEditModel);

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  useEffect(() => {
    if (typeof defaultValue !== "undefined") {
      setFormData({ ...defaultValue });
    }
  }, []);

  return (
    <Panel bodyFill style={{ padding: 20, paddingTop: 0 }}>
      <Panel bodyFill style={{ paddingBottom: 20 }}>
        <p style={{ fontSize: "1.1rem" }}>
          Add new {config.name.charAt(0).toUpperCase() + config.name.slice(1)}{" "}
          field
        </p>
        <small
          style={{
            color: "var(--text-info-color)",
          }}
        >
          {config.hint}
        </small>
      </Panel>
      <Form
        formValue={formData}
        onChange={(formValue) => setFormData({ ...formData, ...formValue })}
      >
        <Tabs defaultActiveKey="1" vertical>
          <Tabs.Tab eventKey="1" title="Basic Settings">
            <BasicSettings type={config.type} formValue={formData} />
          </Tabs.Tab>
          {config.type === "boolean" ||
          config.type === "integer" ||
          config.type === "json" ||
          config.type === "string" ? (
            <Tabs.Tab eventKey="2" title="Advanced Settings">
              <AdvancedSettings type={config.type} formValue={formData} />
            </Tabs.Tab>
          ) : (
            <></>
          )}
        </Tabs>
      </Form>
    </Panel>
  );
}
