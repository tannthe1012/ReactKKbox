import React, { ChangeEvent, useEffect, useState } from "react";
import { Typography, Box, MenuItem, InputLabel, FormControl } from "@mui/material";
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../style/Source.css'
import Button from '@mui/material/Button';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
type Props = RouteComponentProps<RouterProps>;
interface RouterProps {
  history: string;
}
type OptionSelect = {
  Value: string;
  Text: string;
}
const types = [
  {
    Value: 'Artist',
    Text: 'Artist'
  },
  {
    Value: 'Album',
    Text: 'Album'
  },
  {
    Value: 'Playlist',
    Text: 'Playlist'
  },
  {
    Value: 'Track',
    Text: 'Track'
  },
  // {
  //   Value: 'All',
  //   Text: 'All'
  // }

]

const Source: React.FC<Props> = ({ history }) => {
  const currentUser = getCurrentUser();
  const [valueType, setValueType] = useState<string>('All');
  const [valueTextArea, setValueTextArea] = useState<string>("");
  const [countLine, setCountLine] = useState<number>(0);
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
      // window.location.reload();
    }
  })
  const handleChange = (event: SelectChangeEvent) => {

    setValueType(event.target.value as string);

  };
  const saveLinkSource = () => {
    setCountLine(valueTextArea.split("\n").length)
  }
  const handleChangeText = (event : ChangeEvent<HTMLTextAreaElement>) => {
    setValueTextArea(event.target.value);
    if(event.target.value === null || event.target.value === "") {
      setCountLine(0);
    } else {
      setCountLine(event.target.value.split("\n").length)
    }
  };

  return (
    <div className="wrapper">
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }} noWrap>Manage Source Link</Typography>
      </Box>
      <Box sx={{ maxWidth: 1000, minWidth: 700, marginBottom: 2 }} className='flex'>
        <Typography variant="h5" sx={{ marginRight: 2, minWidth: 250, alignItems: 'center', display: 'flex' }} noWrap>Select Type Link</Typography>
        <FormControl fullWidth>

          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={valueType}
            label="All"
            onChange={handleChange}
            sx={{ maxWidth: 600, minWidth: 600 }}
          >
            {
              types.map((type) => {
                return (
                  <MenuItem key={type.Value} value={type.Value}>{type.Text}</MenuItem>
                )

              })
            }


          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 700 }} className='flex'>
        <Typography variant="h5" sx={{ marginRight: 2, minWidth: 250, display: 'flex' }} noWrap>Link Source ({countLine} lines)</Typography>

        <TextareaAutosize
          value={valueTextArea}
          onChange={handleChangeText}
          id="textarea-link"
        />
      </Box>
      <Button variant="contained" color="success" onClick={saveLinkSource}>
        Save
      </Button>
    </div>
  );
};

export default Source;
