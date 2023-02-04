import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterForm from "./FilterForm";

interface TableProps {
  country: {
    name: string;
    region: string;
    area: number;
  }[];
}

const MyTable: React.FC<TableProps> = ({ country }) => {
  const [countryNameFilter, setCountryNameFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);

  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;

  const getLithuaniaArea = (): number | undefined => {
    for (let i = 0; i < country.length; i++) {
      if (country[i].name === "Lithuania") {
        return country[i].area;
      }
    }
    return undefined;
  };

  const lithuaniaArea = getLithuaniaArea();

  const filteredData = country
    .filter((country) => {
      const condition1 = country.name
        .toLowerCase()
        .includes(countryNameFilter.toLowerCase());
      const condition2 = country.region
        .toLowerCase()
        .includes(regionFilter.toLowerCase());
      return condition1 && condition2;
    })
    .filter((country) => {
      return !checked || country.area < (lithuaniaArea as number);
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Records to be displayed on the current page
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleNameSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // gets back to first page when filters are used
  useEffect(() => {
    setCurrentPage(1);
  }, [checked, countryNameFilter, regionFilter]);

  return (
    <div>
      <Typography variant="h1" align="center" sx={{ fontSize: 32 }}>
        Restcountries API
      </Typography>
      <FilterForm
        countryNameFilter={countryNameFilter}
        setCountryNameFilter={setCountryNameFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        checked={checked}
        handleChange={handleChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={handleNameSort} sx={{ cursor: "pointer" }}>
                Name
                {sortOrder === "asc" ? (
                  <ArrowUpwardIcon></ArrowUpwardIcon>
                ) : (
                  <ArrowDownwardIcon></ArrowDownwardIcon>
                )}
              </TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((country) => (
              <TableRow key={country.name}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.region}</TableCell>
                <TableCell>{country.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Pagination
            sx={{ marginTop: 2, marginBottom: 2 }}
            count={nPages}
            variant="outlined"
            page={currentPage}
            size="small"
            boundaryCount={1}
            siblingCount={1}
            onChange={handlePageChange}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default MyTable;
