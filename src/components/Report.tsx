import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Card, InputLabel, MenuItem, FormControl } from "@mui/material";
import { getDataReport, getReport, getAllReport } from "../services/report.service";
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import { ExportCSV } from "./Excel/ExportToCsv";
import Table from "../components/Table";
import usePagination from "../hooks/UsePagination";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../App.css";
import Moment, { now } from 'moment';
import { randomInt } from "crypto";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
const Report: React.FC<Props> = ({ history }) => {
  const currentUser = getCurrentUser();

  const [countSuccess, setCountSuccess] = useState<number>(0);
  const [countFailed, setCountFailed] = useState<number>(0);
  const [countRunning, setCountRunning] = useState<number>(0);
  const [countRecord, setCountRecord] = useState<number>(0);
  const [sph, setSPH] = useState<number>(0);
  const [averageSPH, setAverageSPH] = useState<number>(0);
  const [dataReport, setDataReport] = useState([]);
  const [perPage, setPerPage] = useState<string>('100');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataAll, setDataAll] = useState([]);
  const tableRef = useRef(null);

  const handleChange = (event: SelectChangeEvent) => {
    setPage(1);
    setCurrentPage(1);
    setPerPage(event.target.value as string);
    getReport(0, Number(event.target.value)).then((res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })
  };
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: perPage,
    count: countRecord,
  });


  const Previous = () => {
    prevPage();
    setCurrentPage(currentPage - 1);
    getReport((page - 2) * Number(perPage), Number(perPage)).then((res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })

  }
  const Nextpage = () => {
    nextPage();
    setCurrentPage(currentPage + 1);
    getReport((page) * Number(perPage), Number(perPage)).then((res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })
  }

  const SetPage = (pageNumber: number) => {
    setPage(pageNumber);
    setCurrentPage(pageNumber);
    getReport((pageNumber - 1) * Number(perPage), Number(perPage)).then((res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })
  }
  const getFileName = () => {
    return Moment(Date.now()).format('DD-MM-YYYY:HH:mm:ss');
  }
  console.log(currentPage)
  // const onClickExportAll = async () => {
  //   await getAllReport().then((res) => {
  //     setDataAll(res)
  //   }, (error) => {
  //     console.log(error)
  //   })

  // }


  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
      window.location.reload();
    }
    getDataReport().then((res) => {
      setCountSuccess(res.Data.CountSuccess)
      setCountFailed(res.Data.CountFailed)
      setSPH(res.Data.SPH)
      setAverageSPH(res.Data.AverageSPH)
      setCountRunning(res.Data.countRunning)
      setCountRecord(res.Data.CountRecord)
    }, (error) => {
      console.log(error);
    })
    getReport(currentPage - 1, Number(perPage)).then((res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })






    return () => {
      setInterval(() => {
        getDataReport().then((res) => {
          setCountSuccess(res.Data.CountSuccess)
          setCountFailed(res.Data.CountFailed)
          setSPH(res.Data.SPH)
          setAverageSPH(res.Data.AverageSPH)
          setCountRunning(res.Data.countRunning)
          setCountRecord(res.Data.CountRecord)
        }, (error) => {
          console.log(error);
        })
        getReport(currentPage - 1, Number(perPage)).then((res) => {
          setDataReport(res)
        }, (error) => {
          console.log(error)
        })
      }, 5000);

    }




  }, [])

  return (
    <div className="wrapper">
      <Box>
        <Typography variant="h4" sx={{marginBottom: 2}} noWrap>Manage Client</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
        className="mt-20"
      >
        <Grid item md={3} xs={12}>
          <Card
            className="bg_success"
            sx={{
              overflow: 'visible',
              color: (theme) => theme.palette.common.white,
              bgcolor: (theme) => theme.palette['success'].light
            }}
          >
            <Box

              sx={{
                p: 3
              }}
            >
              <Box>
                <Typography variant="h4" noWrap >Success</Typography>
              </Box>
              <Box>
                <Typography variant="h4" noWrap>{countSuccess}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card
            className="bg_error"
            sx={{
              overflow: 'visible',
              color: (theme) => theme.palette.common.white,
              bgcolor: (theme) => theme.palette['error'].light
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box>
                <Typography variant="h4" noWrap>Failed</Typography>
              </Box>
              <Box>
                <Typography variant="h4" noWrap>{countFailed}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card
            className="bg_warning"
            sx={{
              overflow: 'visible',
              color: (theme) => theme.palette.common.white,
              bgcolor: (theme) => theme.palette['warning'].light
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box>
                <Typography variant="h4" noWrap>SPH</Typography>
              </Box>
              <Box>
                <Typography variant="h4" noWrap>{sph}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card
            className="bg_info"
            sx={{
              overflow: 'visible',
              color: (theme) => theme.palette.common.white,
              bgcolor: (theme) => theme.palette['info'].light
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box>
                <Typography variant="h4" noWrap>Average SPH</Typography>
              </Box>
              <Box>
                <Typography variant="h4" noWrap>{averageSPH}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

      </Grid>
      <Box className="mt-20">
        <Typography variant="h5" noWrap>Số máy đang chạy : {countRunning} </Typography>

      </Box>
      <Box className='flex' sx={{ marginTop: 2 }} >
        <Box sx={{ maxWidth: 180, minWidth: 180 }} >

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Per</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={perPage}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
              <MenuItem value={2000}>2000</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="button-export">
          <ExportCSV csvData={dataReport} exportAll={false} fileName={getFileName()} labelText="Export Data" />

          {/* <button onClick={exportDataToCSV}>export to csv</button> */}
        </div>
        <div className="button-export">
          <ExportCSV csvData={[]} exportAll={true} fileName={getFileName()} labelText="Export All Data" />
          {/* <button onClick={exportDataToCSV}>export to csv</button> */}
        </div>
      </Box>

      <Table data={dataReport}></Table>
      <div className="pagination">
        <p className="text">
          {page}/{totalPages}
        </p>
        <button
          onClick={Previous}
          className={`page ${page === 1 && "disabled"}`}
        >
          &larr;
        </button>
        <button
          onClick={() => SetPage(1)}
          className={`page ${page === 1 && "disabled"}`}
        >
          1
        </button>
        {gaps.before ? "..." : null}
        {/* @ts-ignore */}
        {gaps.paginationGroup.map((el) => (
          <button
            onClick={() => SetPage(el)}
            key={el}
            className={`page ${page === el ? "active" : ""}`}
          >
            {el}
          </button>
        ))}
        {gaps.after ? "..." : null}
        <button
          onClick={() => setPage(totalPages)}
          className={`page ${page === totalPages && "disabled"}`}
        >
          {totalPages}
        </button>
        <button
          onClick={Nextpage}
          className={`page ${page === totalPages && "disabled"}`}
        >
          &rarr;
        </button>
      </div>
      {/* <Table2></Table2> */}
      {/* <SortTable></SortTable> */}

    </div>


  );
};

export default Report;
