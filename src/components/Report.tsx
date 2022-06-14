import React, { useState, useEffect } from "react";
import {Grid, Typography, Box, Card} from "@mui/material";
import {getDataReport, getReport} from "../services/report.service";
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import {Table} from "../components/Table";
import "../App.css";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
const Report: React.FC<Props> = ({history}) => {
  const currentUser = getCurrentUser();
  
  const [countSuccess, setCountSuccess] = useState<number>(0);
  const [countFailed, setCountFailed] = useState<number>(0);
  const [sph, setSPH] = useState<number>(0);
  const [averageSPH, setAverageSPH] = useState<number>(0);
  const [dataReport, setDataReport] = useState([]);
  useEffect( () => {
    if (!currentUser) {
      history.push("/login");
      window.location.reload();
    }
   



    getDataReport().then((res) => {
      console.log(res.Data)
      setCountSuccess(res.Data.CountSuccess)
      setCountFailed(res.Data.CountFailed)
      setSPH(res.Data.SPH)
      setAverageSPH(res.Data.AverageSPH)
    }, (error) => {
      console.log(error);
    })
    getReport().then( (res) => {
      setDataReport(res)
    }, (error) => {
      console.log(error)
    })
    
  }, [])
  
  return (
    <div className="wrapper">
      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={4}
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
      <Table data= {dataReport} ></Table>
    </div>


  );
};

export default Report;
