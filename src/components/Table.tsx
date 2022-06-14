// import React, { forwardRef } from "react";
// import MaterialTable, { Column, Icons } from "@material-table/core";
import MaterialTable, { Column } from "@material-table/core";
// import {
//   AddBox,
//   ArrowDownward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn
// } from "@material-ui/icons";
import { Container } from "@material-ui/core";
// import { Person } from "../types/person";
import { Report } from "../types/Report"

// const tableIcons: Icons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
// };

type Props = {
  // data: Person[];
    data: Report[];
};

// const columns: Array<Column<Person>> = [
//   { title: "Id", field: "id" },
//   { title: "First Name", field: "firstName" },
//   { title: "Last Name", field: "lastName" }
// ];
const columns: Array<Column<Report>> = [
  { title: "ClientId", field: "ClientID" },
  { title: "Address", field: "Address" },
  { title: "Success", field: "Success" },
  { title: "Failed", field: "Failed" },
  { title: "SPH", field: "SPH" },
  { title: "LastUpdate", field: "LastUpdate" },
];

const options = {
  paging: true,
  pageSizeOptions: [10, 20, 30],
  pageSize: 10,
  emptyRowsWhenPaging: false
};

export const Table = ({ data }: Props) => {
  return (
    <Container>
      <MaterialTable
        columns={columns}
        data={data}
        // icons={tableIcons}
        options={options}
      />
    </Container>
  );
};
