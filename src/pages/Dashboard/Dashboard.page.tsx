import React from "react";
import getConnections from "../../service/connections/getConnections.service";

export default function Dashboard() {
  const getConnectionsList = getConnections();
  console.log(getConnectionsList);

  return <div>Dashboard</div>;
}
