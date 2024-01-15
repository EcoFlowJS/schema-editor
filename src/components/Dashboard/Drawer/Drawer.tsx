import { useAtom } from "jotai";
import React from "react";
import { Drawer, Button, Placeholder } from "rsuite";
import { createConnectionDrawerOpenClose } from "../../../store/satabaseConnections.store";

export default function () {
  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);
  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Create New Connection</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <Placeholder.Paragraph />
      </Drawer.Body>
    </Drawer>
  );
}
