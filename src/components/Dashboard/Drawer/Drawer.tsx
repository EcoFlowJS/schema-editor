import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Divider } from "rsuite";
import { createConnectionDrawerOpenClose } from "../../../store/satabaseConnections.store";
import Form from "./From/Form";
import { AlertModal } from "@eco-flow/components-lib";
import "@eco-flow/components-lib/style.css";
import { useNotification } from "@eco-flow/components-lib";

export default function () {
  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [resetForm, setReaetForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => setReaetForm(false), [resetForm]);

  const noti = useNotification({
    header: "Connection Creation Error",
    type: "error",
    children: <>sdf</>,
  });

  return (
    <>
      <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Create New Connection</Drawer.Title>
          <Drawer.Actions>
            <Button
              loading={isLoading}
              type="submit"
              onClick={() => (formRef.current! as any).click()}
              appearance="primary"
            >
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            Ref={formRef}
            OnSubmit={(value) => {
              console.log(value);
              if (Object.keys(value).length > 0) {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setOpenSuccessModal(true);
                }, 3000);
                // setTimeout(() => {
                //   setIsLoading(false);
                //   noti.show();
                // }, 100);
              }
            }}
            disabled={isLoading}
            reset={resetForm}
          />
        </Drawer.Body>
      </Drawer>
      <AlertModal
        open={openSuccessModal}
        confirmButtonProps={{
          onClick: () => {
            setOpenSuccessModal(false);
            setReaetForm(true);
          },
          color: "green",
        }}
        CancelButtonProps={{
          onClick: () => {
            setOpenSuccessModal(false);
            setOpen(false);
          },
          appearance: "default",
        }}
        confirmButtonText="Yes"
        CancelButtonText="No"
      >
        <h6>Database Connection Added</h6>
        <Divider />
        <p>Do you Want To add More Database Connections?</p>
      </AlertModal>
    </>
  );
}
