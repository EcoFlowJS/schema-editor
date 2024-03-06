import React, { useEffect } from "react";
import {
  Button,
  Divider,
  FlexboxGrid,
  IconButton,
  Modal,
  Panel,
  Stack,
} from "rsuite";
import databaseTableTypes from "../../../../defaults/databaseTableTypes.default";
import {
  DatabaseColumnInfo,
  DatabaseTableTypes as DatabaseTypes,
} from "@eco-flow/types";
import TypeConfig from "./TypeConfig/TypeConfig.component";
import { TiArrowLeft } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { IconWrapper } from "@eco-flow/components-lib";
import { FaPlus } from "react-icons/fa";
import { DatabaseCreateColumnSendData } from "../../../../defaults/databaseCreateColumnSendData.default";
import processDatabaseTypeAlias from "../../../../utils/processDatabaseTypeAlias/processDatabaseTypeAlias.util";
import { useAtom } from "jotai";
import { errorNotification } from "../../../../store/notification.store";

interface CreateModifyColumnModalProps {
  modalCreateModify: [
    {
      open: boolean;
      type: "CREATE" | "MODIFY";
      editData?: DatabaseColumnInfo;
    },
    React.Dispatch<
      React.SetStateAction<{
        open: boolean;
        type: "CREATE" | "MODIFY";
        editData?: DatabaseColumnInfo;
      }>
    >
  ];
  databaseColumns: DatabaseColumnInfo[];
  onDone?: (type: "CREATE" | "MODIFY", result: DatabaseColumnInfo) => void;
}

export default function CreateModifyColumnModal({
  modalCreateModify,
  databaseColumns = [],
  onDone = () => {},
}: CreateModifyColumnModalProps) {
  const [_modalCreateModify, setModalCreateModify] = modalCreateModify;
  const [open, setOpen] = React.useState(true);
  const { id, driver, collectonORtable } = useParams();
  const [typeSelected, setTypeSelected] = React.useState(false);
  const [databseData, setDatabaseData] =
    React.useState<DatabaseCreateColumnSendData>({});

  const errorNotificationShow = useAtom(errorNotification)[1];

  const handleNext = (type: DatabaseTypes) => {
    setTypeSelected(true);
    setDatabaseData({
      type: type,
    });
  };

  const handlePrevious = () => {
    setTypeSelected(false);
    setDatabaseData({});
  };

  const handleClose = (event?: React.SyntheticEvent<Element, Event>) => {
    if (!confirm("Are you sure? Your changes will be lost.")) {
      if (event) event.preventDefault();
      return;
    }
    setOpen(false);
  };

  const handleAddModify = (finish: boolean = false) => {
    if (typeof databseData.type === "undefined") {
      errorNotificationShow({
        show: true,
        header:
          _modalCreateModify.type === "MODIFY"
            ? "Modifing Table Error"
            : "Adding Table Error",
        message: "Column type not selected",
      });
      return;
    }
    if (typeof databseData.columnData === "undefined") {
      errorNotificationShow({
        show: true,
        header:
          _modalCreateModify.type === "MODIFY"
            ? "Modifing Table Error"
            : "Adding Table Error",
        message: "Error fetching column data",
      });
      return;
    }
    if (databseData.columnData.columnName.trim().length === 0) {
      errorNotificationShow({
        show: true,
        header:
          _modalCreateModify.type === "MODIFY"
            ? "Modifing Table Error"
            : "Adding Table Error",
        message: "Enter column name.",
      });
      return;
    }

    if (
      !/^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(
        databseData.columnData.columnName.trim()
      )
    ) {
      errorNotificationShow({
        show: true,
        header:
          _modalCreateModify.type === "MODIFY"
            ? "Modifing Table Error"
            : "Adding Table Error",
        message:
          "No special character is allowed for the name of the attribute",
      });
      return;
    }

    const isExist =
      databaseColumns.filter(
        (columnName) =>
          columnName.name.trim() === databseData.columnData!.columnName.trim()
      ).length > 0;

    if (
      (isExist && _modalCreateModify.type === "CREATE") ||
      (isExist &&
        _modalCreateModify.type === "MODIFY" &&
        databseData.columnData!.columnName.trim() !==
          _modalCreateModify.editData?.actualData?.columnData?.columnName.trim())
    ) {
      errorNotificationShow({
        show: true,
        header:
          _modalCreateModify.type === "MODIFY"
            ? "Modifing Table Error"
            : "Adding Table Error",
        message: "Column already exists.",
      });
      return;
    }

    if (databseData.columnData && databseData.type) {
      const alias = processDatabaseTypeAlias(databseData.type);
      onDone(_modalCreateModify.type, {
        name: databseData.columnData.columnName,
        type: databseData.type,
        alias: alias !== null ? alias : "",
        actualData: databseData,
      });
      if (!finish) handlePrevious();
      else setOpen(false);
    }
  };

  useEffect(() => {
    if (_modalCreateModify.type === "MODIFY" && _modalCreateModify.editData)
      setDatabaseData({
        ...databseData,
        type: _modalCreateModify.editData.type,
        columnData: _modalCreateModify.editData!.actualData!.columnData,
      });
  }, [_modalCreateModify.type]);

  return (
    <Modal
      open={_modalCreateModify.open && open}
      onClose={handleClose}
      onExited={() =>
        setModalCreateModify({ ..._modalCreateModify, open: false })
      }
      overflow
      size="lg"
    >
      <Modal.Header
        style={{
          paddingBottom: 24,
          borderBottom: "1px solid var(--rs-divider-border)",
        }}
      >
        <Modal.Title>
          <Stack spacing={5}>
            {typeSelected ? (
              <>
                <IconButton
                  size="lg"
                  style={{ padding: 0 }}
                  appearance="subtle"
                  icon={
                    <div style={{ fontSize: "2.5rem" }}>
                      <IconWrapper icon={TiArrowLeft} />
                    </div>
                  }
                  onClick={handlePrevious}
                />
                {databaseTableTypes
                  .filter((t) => t.type === databseData.type)
                  .map((t, index) => (
                    <div key={index} style={{ fontSize: "1.5rem" }}>
                      <IconWrapper icon={t.icon} />
                    </div>
                  ))}
                {collectonORtable}
              </>
            ) : (
              <>
                {_modalCreateModify.type === "CREATE"
                  ? "Create Table"
                  : _modalCreateModify.type === "MODIFY"
                  ? "Edit Table"
                  : ""}
              </>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!typeSelected && _modalCreateModify.type === "CREATE" ? (
          <Panel bodyFill style={{ padding: "0 20px" }}>
            <h6 style={{ paddingLeft: "1rem" }}>
              Select a field for your table
            </h6>
            <Divider />
            <FlexboxGrid>
              {databaseTableTypes.map((databaseType, index) => (
                <FlexboxGrid.Item
                  key={index}
                  colspan={12}
                  style={{ padding: 15, paddingTop: 0 }}
                >
                  <Button
                    startIcon={
                      <div style={{ fontSize: "1.8rem" }}>
                        <IconWrapper icon={databaseType.icon} />
                      </div>
                    }
                    appearance="subtle"
                    style={{
                      justifyContent: "start",
                      width: "100%",
                      padding: "1.2rem 1.5rem",
                      border: "1px solid var(--dashboard-navbar-border-color)",
                      fontSize: "1rem",
                      color: "var(--rs-text-primary)",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleNext(databaseType.type)}
                  >
                    <FlexboxGrid
                      style={{
                        marginLeft: 18,
                        flexDirection: "column",
                      }}
                    >
                      {databaseType.name.toUpperCase()}
                      <small
                        style={{
                          fontWeight: "normal",
                          color: "var(--text-info-color)",
                        }}
                      >
                        {databaseType.hint}
                      </small>
                    </FlexboxGrid>
                  </Button>
                </FlexboxGrid.Item>
              ))}
            </FlexboxGrid>
          </Panel>
        ) : (
          <></>
        )}

        {typeSelected || _modalCreateModify.type === "MODIFY" ? (
          <TypeConfig
            config={
              _modalCreateModify.type === "MODIFY"
                ? databaseTableTypes.filter(
                    (t) =>
                      t.alias.toUpperCase() ===
                      _modalCreateModify.editData!.alias.toUpperCase()
                  )[0]
                : databaseTableTypes.filter(
                    (t) => t.type === databseData.type
                  )[0]
            }
            onChange={(value) =>
              setDatabaseData({ ...databseData, columnData: value })
            }
            defaultValue={
              _modalCreateModify.type === "MODIFY"
                ? _modalCreateModify.editData!.actualData!.columnData
                : undefined
            }
          />
        ) : (
          <></>
        )}
      </Modal.Body>
      {typeSelected || _modalCreateModify.type === "MODIFY" ? (
        <Modal.Footer
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--rs-divider-border)",
          }}
        >
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>
              <Button
                style={{ minWidth: 130 }}
                appearance="ghost"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Stack spacing={15}>
                {_modalCreateModify.type === "CREATE" ? (
                  <Button
                    style={{ minWidth: 130 }}
                    appearance="ghost"
                    startIcon={<IconWrapper icon={FaPlus} />}
                    onClick={() => handleAddModify()}
                  >
                    Add another field
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  style={{ minWidth: 130 }}
                  appearance="primary"
                  onClick={() => handleAddModify(true)}
                >
                  Finish
                </Button>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Footer>
      ) : (
        <></>
      )}
    </Modal>
  );
}
