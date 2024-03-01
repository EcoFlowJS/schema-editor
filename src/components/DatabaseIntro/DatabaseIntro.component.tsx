import React from "react";
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
      style={{ backgroundColor: "var(--rs-gray-800)" }}
    >
      <Placeholder.Paragraph />
    </Panel>
  );
}
