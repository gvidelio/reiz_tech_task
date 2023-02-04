import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface FilterFormProps {
  countryNameFilter: string;
  setCountryNameFilter: Dispatch<SetStateAction<string>>;
  regionFilter: string;
  setRegionFilter: Dispatch<SetStateAction<string>>;
  checked: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FilterForm: React.FC<FilterFormProps> = ({
  countryNameFilter,
  setCountryNameFilter,
  regionFilter,
  setRegionFilter,
  checked,
  handleChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { md: "flex-end" },
      }}
    >
      <TextField
        label="Country Name"
        value={countryNameFilter}
        variant="standard"
        sx={{ m: 2 }}
        size="medium"
        onChange={(e) => setCountryNameFilter(e.target.value)}
      />
      <TextField
        select
        label="Region"
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        variant="standard"
        //helperText="Filter by region"
        sx={{ m: 2, minWidth: 200 }}
      >
        <MenuItem value="">All Regions</MenuItem>
        <MenuItem value="africa">Africa</MenuItem>
        <MenuItem value="americas">Americas</MenuItem>
        <MenuItem value="asia">Asia</MenuItem>
        <MenuItem value="europe">Europe</MenuItem>
        <MenuItem value="oceania">Oceania</MenuItem>
      </TextField>
      <FormGroup sx={{ m: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Show countries smaller than Lithuania"
        />
      </FormGroup>
    </Box>
  );
};

export default FilterForm;
