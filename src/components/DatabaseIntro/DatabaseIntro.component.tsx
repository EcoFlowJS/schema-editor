import { Panel, Placeholder } from "rsuite";

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
      <Placeholder.Paragraph />
    </Panel>
  );
}
