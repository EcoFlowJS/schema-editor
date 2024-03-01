import { IconWrapper } from "@eco-flow/components-lib";
import React, { useEffect } from "react";
import { LuRefreshCcwDot } from "react-icons/lu";
import {
  Button,
  FlexboxGrid,
  Input,
  Panel,
  PanelGroup,
  SelectPicker,
  Stack,
  Table,
} from "rsuite";
import { SortType } from "rsuite/esm/Table";
import getDatabaseData from "../../../service/database/showDatabaseData.service";
import { useNavigate, useParams } from "react-router-dom";
const { Column, HeaderCell, Cell } = Table;

export default function DatabaseData() {
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();

  const [isLoading, setLoading] = React.useState(true);
  const [sortColumn, setSortColumn] = React.useState<string>();
  const [sortType, setSortType] = React.useState<SortType>();

  const [databaseData, setDatabaseData] = React.useState([]);
  const [databaseColumns, setDatabaseColumns] = React.useState([]);

  useEffect(() => {
    (async () => await fetchDatabaseData())();
  }, [collectonORtable]);

  const ProcessData = (data: Array<any>) => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];
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

  const fetchDatabaseData = async () => {
    setLoading(true);
    try {
      const response = await getDatabaseData(id!, collectonORtable!);
      if (response.success) {
        setLoading(false);
        setDatabaseColumns(
          response.payload.columns ? response.payload.columns : []
        );
        setDatabaseData(response.payload.data);
      }
    } catch {
      navigate("/editor/schema/404");
    }
  };

  return (
    <Panel>
      <FlexboxGrid
        justify="space-between"
        align="middle"
        style={{ paddingBottom: "1rem" }}
      >
        <FlexboxGrid.Item>
          <Stack spacing={10}>
            <SelectPicker
              searchable={false}
              data={[
                { value: "id", label: "id" },
                { value: "abc", label: "abc" },
              ]}
            />
            <Input />
            <Button>filter</Button>
          </Stack>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Button
            appearance="subtle"
            size="sm"
            startIcon={<IconWrapper icon={LuRefreshCcwDot} />}
            onClick={() => fetchDatabaseData()}
          >
            Refresh
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {driver === "knex" ? (
        <Table
          height={400}
          data={ProcessData(databaseData)}
          bordered
          loading={isLoading}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
        >
          {databaseColumns.map((column) => {
            return (
              <Column key={column} flexGrow={1} resizable sortable>
                <HeaderCell>{column}</HeaderCell>
                <Cell dataKey={column} />
              </Column>
            );
          })}
        </Table>
      ) : driver === "mongo" ? (
        <PanelGroup>
          {databaseData.map((data) => (
            <Panel>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Panel>
          ))}
        </PanelGroup>
      ) : (
        <></>
      )}
    </Panel>
  );
}
