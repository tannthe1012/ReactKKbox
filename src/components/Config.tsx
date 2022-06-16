import React, { useState, useEffect, useRef }  from "react";
import { Grid, Typography, Box, Card, InputLabel, MenuItem, FormControl } from "@mui/material";
import { RouteComponentProps } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import MutilSliderRange from "./slide-range/MutilSliderRange";
// import { getCurrentUser } from "../services/auth.service";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
const Config: React.FC<Props> = ({history}) => {
  const min = 90;
  const max = 300;
  const currentUser = getCurrentUser();
  const [start, setStart] = useState<number>(150);
  const [end, setEnd] = useState<number>(200);

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
      window.location.reload();
    }
  })
  const setValuerRange = (newValue: number[]) => {
    console.log(newValue)
  }


  return (
    <div className="wrapper">
      <Box>
        <Typography variant="h4" sx={{marginBottom: 2}} noWrap>Manage Config</Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{marginBottom: 2}} noWrap>Music Play Time</Typography>
        <MutilSliderRange  start={start} end={end} min={min} max={max} parentCallback={setValuerRange}/>
      </Box>
    </div>

  );
};

export default Config;
