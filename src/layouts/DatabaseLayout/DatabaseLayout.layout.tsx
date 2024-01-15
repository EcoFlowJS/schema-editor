import React from "react";
import { useParams } from "react-router-dom";

export default function DatabaseLayout() {
  const prams = useParams();
  console.log(prams);

  return <div>DatabaseLayout</div>;
}
