import { IconWrapper } from "@eco-flow/components-lib";
import React, { useEffect } from "react";
import { LuRefreshCcwDot } from "react-icons/lu";
import { Panel } from "rsuite";
import getDatabaseData from "../../../service/database/showDatabaseData.service";
import { useNavigate, useParams } from "react-router-dom";
import { DatabaseColumnInfo, DatabaseDataResult } from "@eco-flow/types";
import { GrTableAdd } from "react-icons/gr";
import { useAtom } from "jotai";
import {
  databaseDatas,
  openInsertModifyModal,
} from "../../../store/schemaEditor.store";
import InsertModifyModal, {
  InsertModifyModalMode,
} from "../Modals/InsertModifyModal/InsertModifyModal.component";
import DatabaseDataKnex from "./DatabaseDataKnex/DatabaseDataKnex.component";
import DatabaseDataMongo from "./DatabaseDataMongo/DatabaseDataMongo.component";
import DatabaseDataHeader from "./DatabaseDataHeader/DatabaseDataHeader.component";

export default function DatabaseData() {
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();

  const [isLoading, setLoading] = React.useState(true);
  const [databaseData, setDatabaseData] = useAtom(databaseDatas);
  const [databaseColumns, setDatabaseColumns] = React.useState<
    DatabaseColumnInfo[]
  >([]);

  const setOpen = useAtom(openInsertModifyModal)[1];
  const [modalMode, setModalMode] =
    React.useState<InsertModifyModalMode>("insert");
  const [modalEditValues, setModalEditValues] = React.useState<any>({});

  useEffect(() => {
    (async () => await fetchDatabaseData())();
  }, [collectonORtable]);

  const fetchDatabaseData = async () => {
    setLoading(true);
    try {
      const response = await getDatabaseData(id!, collectonORtable!);
      if (response.success) {
        setLoading(false);
        setDatabaseColumns(
          response.payload.columns
            ? [
                { name: "_id", type: "integer", alias: "Number" },
                ...response.payload.columns,
              ]
            : []
        );
        setDatabaseData(
          response.payload.data.map((value: any, index: number) => {
            return {
              id: index,
              data: value,
            };
          })
        );
      }
    } catch {
      navigate("/editor/schema/404");
    }
  };

  return (
    <>
      <Panel>
        <DatabaseDataHeader
          insertButtonProps={{
            appearance: "subtle",
            size: "sm",
            startIcon: <IconWrapper icon={GrTableAdd} />,
            onClick: () => {
              setOpen(true);
              setModalMode("insert");
              setModalEditValues({});
            },
          }}
          refreshButtonProps={{
            appearance: "subtle",
            size: "sm",
            startIcon: <IconWrapper icon={LuRefreshCcwDot} />,
            onClick: () => fetchDatabaseData(),
          }}
        />
        {driver === "knex" ? (
          <DatabaseDataKnex
            loading={isLoading}
            databaseData={databaseData}
            databaseColumns={databaseColumns}
            setModalMode={setModalMode}
            setModalEditValues={setModalEditValues}
          />
        ) : driver === "mongo" ? (
          <DatabaseDataMongo databaseData={databaseData} />
        ) : (
          <></>
        )}
      </Panel>
      <InsertModifyModal
        columnInfo={databaseColumns}
        mode={modalMode}
        defaultValue={modalEditValues}
      />
    </>
  );
}
