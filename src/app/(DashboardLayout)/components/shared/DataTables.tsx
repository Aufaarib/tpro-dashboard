import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import CustomStylesTable from "./CustomStylesTable";

interface Data {
  value?: any;
  valueSearchBy?: any;
  onChange?: any;
  columns?: any;
  pagination?: any;
  data?: any;
  onChangeSearch?: any;
  onChangeSearchBy?: any;
  searchOption?: { id?: number; value?: string; label?: string }[];
}

const DataTables: React.FC<Data> = ({
  value,
  valueSearchBy,
  onChange,
  pagination,
  columns,
  data,
  onChangeSearch,
  onChangeSearchBy,
  searchOption,
}) => {
  return (
    <>
      <DataTable
        customStyles={CustomStylesTable}
        columns={columns}
        data={data}
        pagination={pagination}
      />
    </>
  );
};

export default DataTables;
