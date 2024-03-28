import React, { useEffect } from "react";
import { FaGears } from "react-icons/fa6";
import { Panel, Table } from "rsuite";
import { SortType } from "rsuite/esm/Table";
import CellActionButton from "./DatabaseDataTable/CellActionButton.component";
import { useAtom } from "jotai";
import {
  databaseDatas,
  openInsertModifyModal,
} from "../../../../store/schemaEditor.store";
import { ApiResponse, DatabaseColumnInfo } from "@eco-flow/types";
import CustomCell from "./DatabaseDataTable/CustomCell.component";
import { InsertModifyModalMode } from "../../Modals/InsertModifyModal/InsertModifyModal.component";
import { AlertModal } from "@eco-flow/components-lib";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";
import deleteDatabaseData from "../../../../service/database/deleteDatabaseData.service";
import { useParams } from "react-router-dom";
import { userPermissions as userPermissionsList } from "../../../../store/users.store";

const { Column, HeaderCell } = Table;

interface DatabaseDataKnexProps {
  loading?: boolean;
  databaseData?: {
    id: number;
    data: any;
  }[];
  databaseColumns?: DatabaseColumnInfo[];
  setModalMode?: React.Dispatch<React.SetStateAction<InsertModifyModalMode>>;
  setModalEditValues?: React.Dispatch<any>;
}

export default function DatabaseDataKnex({
  loading = false,
  databaseData = [],
  databaseColumns = [],
  setModalMode = React.useState<InsertModifyModalMode>("edit")[1],
  setModalEditValues = React.useState<any>({})[1],
}: DatabaseDataKnexProps) {
  const { id, collectonORtable } = useParams();

  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingRecordDelete, setLoadingRecordDelete] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState<string>();
  const [sortType, setSortType] = React.useState<SortType>();

  //User permission states
  const [userPermissions] = useAtom(userPermissionsList);

  const [alertModal, setAlertModal] = React.useState<{
    show: boolean;
    id?: string;
  }>({
    show: false,
  });

  const setOpen = useAtom(openInsertModifyModal)[1];
  const setDatabaseData = useAtom(databaseDatas)[1];
  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];

  const ProcessData = (data: Array<any>) => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x: any = a["data"][sortColumn];
        let y: any = b["data"][sortColumn];
        if (typeof x === "string") {
          x = (x as any).charCodeAt();
        }
        if (typeof y === "string") {
          y = (y as any).charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }

    return data;
  };

  const handleSortColumn = (
    sortColumn: string,
    sortType: SortType | undefined
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleDeleteRecord = () => {
    if (typeof alertModal.id === "undefined") {
      errorNoti({
        show: true,
        header: "Record Removal Error",
        message: "Record deletion id missmatched",
      });
      return;
    }

    setLoadingRecordDelete(true);
    const dataToBeDeleted = databaseData.filter(
      (value: any) => Number(value.id) === Number(alertModal.id)
    )[0].data;

    deleteDatabaseData(id!, collectonORtable!, dataToBeDeleted._id).then(
      (response: ApiResponse) => {
        setLoadingRecordDelete(false);
        if (response.success) {
          successNoti({
            show: true,
            header: "Record Removal Success",
            message: "Record removal from database successful",
          });
          setDatabaseData(
            response.payload.data.map((value: any, index: number) => {
              return {
                id: index,
                data: value,
              };
            })
          );
          setAlertModal({ show: false });
        }
      },
      (reject: ApiResponse) => {
        setLoadingRecordDelete(false);
        if (reject.error)
          errorNoti({
            show: true,
            header: "Record Removal Error",
            message:
              typeof reject.payload === "object"
                ? reject.payload.sqlMessage
                : reject.payload,
          });
      }
    );
  };

  useEffect(() => setLoading(loading), [loading]);

  return (
    <>
      <Table
        height={400}
        data={ProcessData(databaseData)}
        bordered
        loading={isLoading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        {databaseColumns!.map((column) => {
          return (
            <Column key={column.name} flexGrow={1} resizable sortable>
              <HeaderCell>{column.name}</HeaderCell>
              <CustomCell dataKey={column.name} />
            </Column>
          );
        })}
        <Column width={110}>
          <HeaderCell align="center" style={{ fontSize: "1.3rem" }}>
            <FaGears />
          </HeaderCell>
          <CellActionButton
            onClickEdit={(id) => {
              setOpen(true);
              setModalMode("edit");
              setModalEditValues(
                databaseData.filter(
                  (value: any) => Number(value.id) === Number(id)
                )[0].data
              );
            }}
            onClickDelete={(id) => setAlertModal({ show: true, id: id })}
            editDisabled={
              !userPermissions.administrator && !userPermissions.modifyDBRecord
            }
            dropDisabled={
              !userPermissions.administrator && !userPermissions.removeDBRecord
            }
          />
        </Column>
      </Table>
      <Panel
        bodyFill
        style={{ color: "var(--text-info-color)", padding: "5px" }}
      >
        <small>{databaseData.length} entries found</small>
      </Panel>

      <AlertModal
        open={alertModal.show}
        onClose={() => setAlertModal({ show: false })}
        CancelButtonProps={{
          disabled: isLoadingRecordDelete,
          appearance: "subtle",
          color: "cyan",
          onClick: () => setAlertModal({ show: false }),
        }}
        confirmButtonProps={{
          loading: isLoadingRecordDelete,
          appearance: "primary",
          color: "red",
          onClick: handleDeleteRecord,
        }}
      >
        <AlertModal.Header>Are you sure?</AlertModal.Header>
        <AlertModal.Body>
          Deleting a record is permanent and can't be restored back.
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
