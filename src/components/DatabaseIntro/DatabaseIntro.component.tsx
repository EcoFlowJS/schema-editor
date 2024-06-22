import { FlexboxGrid, Panel, Text } from "rsuite";

export default function DatabaseIntro() {
  return (
    <Panel
      header={
        <div>
          <h4>Introduction</h4>
        </div>
      }
      bordered
      style={{
        backgroundColor: "var(--dashboard-subcontent-background-color)",
      }}
    >
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={18} style={{ padding: 30 }}>
          <Text size="xl" align="justify" transform="capitalize" muted>
            Easily manage your databases within EcoFlowJS. This section allows
            you to manage database record. Streamline your backend development
            by integrating and managing your databases efficiently and
            effectively.
          </Text>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
}
