import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { Drawer, Button, Divider } from "rsuite";
import {
  createConnectionDrawerOpenClose,
  databaseGetConnectionList,
} from "../../../../store/Connections.store";
import Form from "../From/Form.component";
import { AlertModal } from "@ecoflow/components-lib";
import "@ecoflow/components-lib/style.css";
import createConnectionService from "../../../../service/connections/createConnection.service";
import { ApiResponse } from "@ecoflow/types";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";

export default function () {
  const [_databaseConnectionList, setDatabaseConnectionList] = useAtom(
    databaseGetConnectionList
  );

  const [open, setOpen] = useAtom(createConnectionDrawerOpenClose);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [resetForm, setReaetForm] = useState(false);
  const formRef = useRef(null);
  const [response, setResponse] = useState<ApiResponse>({});

  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  useEffect(() => setReaetForm(false), [resetForm]);
  useEffect(() => {
    setIsLoading(false);
    if (response.error)
      setErrorNotification({
        show: true,
        header: "Connection Creation Error",
        message: response.payload.message,
      });
    if (response.success) {
      setOpenSuccessModal(true);
      setDatabaseConnectionList(response.payload.connectionList);
      setSuccessNotification({
        show: true,
        header: "Connection Creation success",
        message: response.payload.message,
      });
    }
  }, [response]);

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
        <AlertModal.Body>
          <h6>Database Connection Added</h6>
          <Divider />
          <p>Do you Want To add More Database Connections?</p>
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
