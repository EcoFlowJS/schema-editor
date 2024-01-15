import React from "react";
import { Placeholder, Stack } from "rsuite";

export default function Loading() {
  return (
    <Stack spacing={15} style={{ maxWidth: "85vw" }}>
      <Placeholder.Graph
        style={{
          height: "4rem",
          width: "4rem",
          borderRadius: "50%",
        }}
        active
      />
      <Placeholder.Graph
        style={{
          height: "4rem",
          width: "4rem",
          borderRadius: "50%",
        }}
        active
      />
      <Placeholder.Graph
        style={{
          height: "4rem",
          width: "4rem",
          borderRadius: "50%",
        }}
        active
      />
      <Placeholder.Graph
        style={{
          height: "4rem",
          width: "4rem",
          borderRadius: "50%",
        }}
        active
      />
    </Stack>
  );
}
