import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Divider } from "rsuite";
import {
  createConnectionDrawerOpenClose,
  databaseGetConnectionList,
} from "../../../store/Connections.store";
import Form from "./From/Form";
import { AlertModal } from "@eco-flow/components-lib";
import "@eco-flow/components-lib/style.css";
import { useNotification } from "@eco-flow/components-lib";
import createConnectionService from "../../../service/connections/createConnection.service";
import { ConnectionResponse } from "@eco-flow/types";
import getConnectionsService from "../../../service/connections/getConnections.service";

export default function () {
  const [_databaseConnectionList, setDatabaseConnectionList] = useAtom(
    databaseGetConnectionList
  );

  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [resetForm, setReaetForm] = useState(false);
  const formRef = useRef(null);
  const [response, setResponse] = useState<ConnectionResponse>({});

  useEffect(() => setReaetForm(false), [resetForm]);
  useEffect(() => {
    setIsLoading(false);
    if (response.error) errorNoti.show();
    if (response.success) {
      setOpenSuccessModal(true);
      setDatabaseConnectionList(response.payload.connectionList);
    }
    // if (Object.keys(response).length > 0) setResponse({});
  }, [response]);

  const errorNoti = useNotification({
    header: "Connection Creation Error",
    type: "error",
    placement: "bottomEnd",
    children: <>{response.error ? response.payload.message : <></>}</>,
  });

  return (
    <>
      <Drawer
        backdrop="static"
        open={open}
        onClose={async () => {
          setOpen(false);
        }}
      >
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
            OnSubmit={async (value) => {
              if (Object.keys(value).length > 0) {
                setIsLoading(true);
                setResponse(await createConnectionService(value));
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
