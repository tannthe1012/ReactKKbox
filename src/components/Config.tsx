import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Card, InputLabel, MenuItem, FormControl } from "@mui/material";
import { RouteComponentProps } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import MutilSliderRange from "./slide-range/MutilSliderRange";
import Slider from '@mui/material/Slider';
// import { getCurrentUser } from "../services/auth.service";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
const Config: React.FC<Props> = ({ history }) => {
  const min = 90;
  const max = 300;
  const currentUser = getCurrentUser();
  const [start, setStart] = useState<number>(150);
  const [end, setEnd] = useState<number>(200);
  const [rateArtist, setRateArtist] = useState<number>(25);
  const [rateAlbum, setRateAlbum] = useState<number>(25);
  const [ratePlaylist, setRatePlaylist] = useState<number>(25);
  const [rateTrack, setRateTrack] = useState<number>(25);
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
      window.location.reload();
    }
  })
  const setValuerRange = (newValue: number[]) => {
    setStart(newValue[0]);
    setEnd(newValue[1]);
  }
  // const handleChange = (type: string, newValue:number) => {
  //  console.log(type)
  //  console.log(newValue)
  // };
  const handleChange = (event: Event,newValue: number | number[]) => {
    // (newValue as number[]);
    // parentCallback(newValue as number[])setValue;
    console.log(event);
    console.log(newValue as number);
    setRateArtist(newValue as number);
  };

  return (
    <div className="wrapper">
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }} noWrap>Manage Config</Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2 }} noWrap>Music Play Time</Typography>
        <MutilSliderRange start={start} end={end} min={min} max={max} parentCallback={setValuerRange} />
      </Box>
      <Box>
        <Typography
          variant="h4" sx={{ marginBottom: 2 }} noWrap>Music Playback Rate
        </Typography>
        <Typography
          variant="h5" sx={{ marginBottom: 2 }} noWrap>Artist: {rateArtist}%
        </Typography>
        <Slider
          // defaultValue={rateArtist}
          name="artist"
          value={rateArtist}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
        <Typography
          variant="h5" sx={{ marginBottom: 2 }} noWrap>Album : {rateAlbum}%
        </Typography>
        <Slider
         name="album"
          value={rateAlbum}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
        <Typography
          variant="h5" sx={{ marginBottom: 2 }} noWrap>Playlist : {ratePlaylist}%
        </Typography>
        <Slider
         name="playlist"
          value={ratePlaylist}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
        <Typography
          variant="h5" sx={{ marginBottom: 2 }} noWrap>Track : {rateTrack}%
        </Typography>
        <Slider
         name="track"
          value={rateTrack}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </Box>


    </div>

  );
};

export default Config;
