import React from "react";
import {Grid, Typography, Box, Card} from "@mui/material";

import { getCurrentUser } from "../services/auth.service";

const Report: React.FC = () => {
  // const currentUser = getCurrentUser();
  
  return (
    // <div>
    //   Report
    // </div>
    // <div className="container">
    //   {/* <header className="jumbotron">
    //     <h3>
    //       <strong>{currentUser.username}</strong> Report
    //     </h3>
    //   </header>
    //   <p>
    //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
    //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
    //   </p>
    //   <p>
    //     <strong>Id:</strong> {currentUser.id}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {currentUser.email}
    //   </p>
    //   <strong>Authorities:</strong>
    //   <ul>
    //     {currentUser.roles &&
    //       currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
    //   </ul> */}
    //   Report
    // </div>



    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="stretch"
    spacing={4}
    >
      <Grid item md={3} xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
           sx={{
            p: 3
          }}
          >
            <Box>
              <Typography variant="h4" noWrap>Tan</Typography>
            </Box>
            <Box>
              <Typography variant="h4" noWrap>Tung</Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
           sx={{
            p: 3
          }}
          >
            <Box>
              <Typography variant="h4" noWrap>Tan</Typography>
            </Box>
            <Box>
              <Typography variant="h4" noWrap>Tung</Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
           sx={{
            p: 3
          }}
          >
            <Box>
              <Typography variant="h4" noWrap>Tan</Typography>
            </Box>
            <Box>
              <Typography variant="h4" noWrap>Tung</Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
           sx={{
            p: 3
          }}
          >
            <Box>
              <Typography variant="h4" noWrap>Tan</Typography>
            </Box>
            <Box>
              <Typography variant="h4" noWrap>Tung</Typography>
            </Box>
          </Box>
        </Card>
      </Grid>

    </Grid>



  );
};

export default Report;
