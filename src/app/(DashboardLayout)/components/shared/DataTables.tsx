import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import CustomStylesTable from "./CustomStylesTable";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Data {
  value?: any;
  valueSearchBy?: any;
  onChange?: any;
  columns?: any;
  pagination?: any;
  data?: any;
  page?: any;
  meta?: any;
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
  meta,
  page,
  onChangeSearch,
  onChangeSearchBy,
  searchOption,
}) => {
  console.log(meta);
  return (
    <>
      <DataTable
        customStyles={CustomStylesTable}
        columns={columns}
        data={data}
        // pagination={pagination}
      />
      {pagination ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "red",
            // border: "1px solid #CCD1D9",
            padding: "10px",
          }}
        >
          {/* <Typography sx={{ fontSize: "13px" }}>
            Show 1 to {meta.per_page} of {meta.total} results
          </Typography> */}
          <Box>
            <Pagination
              style={{
                // backgroundColor: "gray",
                borderRadius: "8px",
                padding: "4px",
                // background: "var(--UI-Neutral-Neutral-30, #F5F6FA)",
              }}
              onChange={onChange}
              page={page}
              count={meta?.page_count}
              defaultPage={1}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: KeyboardArrowLeft,
                    next: KeyboardArrowRight,
                  }}
                  {...item}
                />
              )}
              sx={{
                "& .MuiPaginationItem-previousNext": {
                  color: "black",
                  backgroundColor: "transparent", // Customize the background color of the ul element
                  // padding: "8px", // Add padding to the ul element for spacing
                  borderRadius: "8px", // Optional: Customize the border radius of the ul element
                },
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  "&.Mui-selected": {
                    // borderColor: "primary.main",
                    backgroundColor: "black", // Customize the background color of the selected pagination item
                    color: "white", // Customize the text color of the selected pagination item
                  },
                },
              }}
            />
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default DataTables;
