import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { RouteComponentProps } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { getConfigs, postConfigs } from "../services/config.service";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import MutilSliderRange from "./slide-range/MutilSliderRange";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { ConfigModel } from "../types/Config";
import { endianness } from "os";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Config: React.FC<Props> = ({ history }) => {
  const min = 90;
  const max = 300;
  const currentUser = getCurrentUser();

  
 
  
 
  const [start, setStart] = useState<number>(150);
  const [end, setEnd] = useState<number>(0);
  const [rateArtist, setRateArtist] = useState<number>(25);
  const [rateAlbum, setRateAlbum] = useState<number>(25);
  const [ratePlaylist, setRatePlaylist] = useState<number>(25);
  const [rateTrack, setRateTrack] = useState<number>(25);
  const [open, setOpen] = React.useState(false);
  var arr_percent = [rateArtist, rateAlbum, ratePlaylist, rateTrack];
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
      // window.location.reload();
    }
    getConfigs().then((res) => {
      console.log(res);
      setStart(res.Data.PlayFrom)
      setEnd(res.Data.PlayTo);
      setRateArtist(res.Data.PercentArtist);
      setRateAlbum(res.Data.PercentAlbum);
      setRatePlaylist(res.Data.PercentPlaylist);
      setRateTrack(res.Data.PercentTrack);
      arr_percent = [res.Data.PercentArtist, res.Data.PercentAlbum, res.Data.PercentPlaylist, res.Data.PercentTrack]
    }, (error) => {
      console.log(error)
    })
  }, [])
  const setValuerRange = (newValue: number[]) => {
    setStart(newValue[0]);
    setEnd(newValue[1]);
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const saveConfig = () => {
    const config: ConfigModel = {
      PlayFrom: start,
      PlayTo: end,
      PercentAlbum: rateAlbum,
      PercentArtist: rateArtist,
      PercentPlaylist: ratePlaylist,
      PercentTrack: rateTrack
    }
    postConfigs(config).then((res) => {
      console.log(res);
      setOpen(true);
    }, (error) => {
      console.log(error);
    })

  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    let a = event.target as HTMLInputElement;
    if (a.name === 'artist') {
      arr_percent[0] = newValue as number;
    } else if (a.name === "album") {
      arr_percent[1] = newValue as number;
    } else if (a.name === "playlist") {
      arr_percent[2] = newValue as number;
    } else if (a.name === "track") {
      arr_percent[3] = newValue as number;
    }


    updateSliderRange(a.name, newValue as number);
  };

  const updateSliderRange = (type: string, newValue: number) => {
    let sum = arr_percent.reduce((a, b) => a + b, 0);
    let max = -1;
    let min = 999;
    let indexSlider = 0;
    let indexchange = 0;
    if (type === 'artist') {
      indexSlider = 0;
    } else if (type === "album") {
      indexSlider = 1;
    } else if (type === "playlist") {
      indexSlider = 2;
    } else if (type === "track") {
      indexSlider = 3;
    }
    if (sum > 100) {
      for (let index = 0; index < arr_percent.length; index++) {
        if (index !== indexSlider) {
          if (arr_percent[index] > max) {
            indexchange = index;
            max = arr_percent[index]
          }
        }
      }
    } else if (sum < 100) {
      for (let index = 0; index < arr_percent.length; index++) {
        if (index !== indexSlider) {
          if (arr_percent[index] < min) {
            indexchange = index;
            min = arr_percent[index]
          }
        }
      }
    }
    if (arr_percent[indexchange] - (sum - 100) < 0) {
      arr_percent[indexchange] = 0;
      updateSliderRange(type, newValue - arr_percent[indexchange]);
    } else {
      arr_percent[indexchange] = arr_percent[indexchange] - (arr_percent.reduce((a, b) => a + b, 0) - 100)
    }
    setRateAlbum(arr_percent[1])
    setRateArtist(arr_percent[0])
    setRatePlaylist(arr_percent[2])
    setRateTrack(arr_percent[3])
  }

  return (
    <div className="wrapper">
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }} noWrap>Manage Config</Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2 }} noWrap>Music Play Time: {start}s - {end}s</Typography>
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
      <Button variant="contained" color="success" onClick={saveConfig}>
        Save
      </Button>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Update Config Success
          </Alert>
        </Snackbar>
      </Stack>

    </div>

  );
};

export default Config;
