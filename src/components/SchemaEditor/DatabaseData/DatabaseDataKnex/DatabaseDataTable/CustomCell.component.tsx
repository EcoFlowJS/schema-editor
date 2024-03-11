import { Input, Table } from "rsuite";
import { RowDataType, RowKeyType } from "rsuite-table/lib/@types/common";
import { InnerCellProps } from "rsuite-table/lib/Cell";

interface CustomCellProps
  extends InnerCellProps<RowDataType<any>, RowKeyType> {}

export default function CustomCell({
  rowData = [],
  dataKey = "",
  ...props
}: CustomCellProps) {
  return (
    <Table.Cell {...props}>
      <span className="table-content-edit-span">
        {rowData["data"][dataKey]}
      </span>
    </Table.Cell>
  );
}
