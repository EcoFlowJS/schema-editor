import React from "react";
import { Panel, PanelGroup } from "rsuite";

interface DatabaseDataMongoProps {
  databaseData?: {
    id: number;
    data: any;
  }[];
}

export default function DatabaseDataMongo({
  databaseData = [],
}: DatabaseDataMongoProps) {
  return (
    <PanelGroup>
      {databaseData.map((data) => (
        <Panel>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Panel>
      ))}
    </PanelGroup>
  );
}
