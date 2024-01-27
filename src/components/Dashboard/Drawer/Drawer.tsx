import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { Drawer, Button } from "rsuite";
import { createConnectionDrawerOpenClose } from "../../../store/satabaseConnections.store";
import Form from "./From/Form";

export default function () {
  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);
  const [fromData, setFormData] = useState({});
  const formRef = useRef(null);
  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Create New Connection</Drawer.Title>
        <Drawer.Actions>
          <Button
            type="submit"
            // onClick={() => setOpen(false)}
            onClick={() => {
              (formRef.current! as any).click();
            }}
            appearance="primary"
          >
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <Form Ref={formRef} OnSubmit={(value) => console.log(value)} />
      </Drawer.Body>
    </Drawer>
  );
}
