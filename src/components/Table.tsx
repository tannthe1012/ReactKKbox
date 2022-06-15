import {useCallback, useState, MouseEventHandler} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../style/Table.css';
import { Report } from "../types/Report";


type Data = {
  ReportID: number;
  ClientID: number;
  Address: string;
  Success: number;
  Failed: number;
  SPH: number;
  LastUpdate: string;
}[];
type SortKeys = keyof Data[0];
type SortOrder = "ascn" | "desc";
function sortData(data : Report[] ,{
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
type Pros = {
  data : Report[];
}


export default function CustomizedTables({data} : Pros) {
  const [sortKey, setSortKey] = useState<SortKeys>("ClientID");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: {key:SortKeys; label: string}[] =  [
    {key : "ReportID", label: "STT"},
    {key : "ClientID", label: "ClientID"},
    {key : "Address", label: "Address"},
    {key : "Success", label: "Success"},
    {key : "Failed", label: "Failed"},
    {key : "SPH", label: "SPH"},
    {key : "LastUpdate", label: "LastUpdate"}
  ];

  const sortedData = useCallback(
    () => sortData(data ,{ tableData: data, sortKey, reverse: sortOrder === "desc"}),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }






  return (
    <TableContainer className='mt-20' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((row) => {
              return (
                <StyledTableCell 
                  key = {row.key}
                  align='center'
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                >

                  {row.label}
                  
                </StyledTableCell>
              );
            })}
            {/* <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell>ClientID</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Success</StyledTableCell>
            <StyledTableCell align="center">Failed</StyledTableCell>
            <StyledTableCell align="center">SPH</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {sortedData().map((row, index) => (
            <StyledTableRow key={row.ReportID}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.ClientID}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Address}</StyledTableCell>
              <StyledTableCell align="center">{row.Success}</StyledTableCell>
              <StyledTableCell align="center">{row.Failed}</StyledTableCell>
              <StyledTableCell align="center">{row.SPH}</StyledTableCell>
            </StyledTableRow>
          ))} */}
          {sortedData().map((row, index) => {
            return (
              <StyledTableRow key={row.ReportID}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.ClientID}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Address}</StyledTableCell>
                <StyledTableCell align="center">{row.Success}</StyledTableCell>
                <StyledTableCell align="center">{row.Failed}</StyledTableCell>
                <StyledTableCell align="center">{row.SPH}</StyledTableCell>
                <StyledTableCell align="center">{row.LastUpdate}</StyledTableCell>
              </StyledTableRow>
            )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}