import {
  Box,
  Button,
  Chip,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { IconEye, IconFlame, IconFlameOff } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import DataTables from "../shared/DataTables";

interface Data {
  merchant_id: number;
  name: string;
  description: string;
  bucket: { balance: number };
}

interface Props {
  data: Data[];
}

const columns: TableColumn<Data>[] = [
  {
    name: "No",
    selector: (_row, i: any) => i + 1,
    // sortable: true,
    width: "190px",
    style: {
      paddingLeft: "30px",
    },
  },
  {
    name: "Name",
    cell: (row: Data) => <div>{row.name}</div>,
    // sortable: true,
    width: "300px",
  },
  {
    name: "Total Topup",
    cell: (row: Data) => (
      <div>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.bucket?.balance)}
      </div>
    ),
    // sortable: true,
    width: "400px",
  },
  {
    name: "Action",
    cell: (row: Data) => (
      <Stack spacing={1} direction="row">
        <Link
          href={{
            pathname: "/ui-components/detonator/info",
            query: {
              id: row.merchant_id,
            },
          }}
        >
          <Button
            sx={{
              border: "1.2px solid #191C28",
              color: "black",
              fontSize: "14px",
              fontWeight: 600,
              width: "115px",
              borderRadius: "8px",
            }}
          >
            Detail
          </Button>
        </Link>
      </Stack>
    ),
    // sortable: true,
  },
  // Add more columns as needed
];

const DataTableComponent: React.FC<Props> = ({ data }) => {
  const [filterText, setFilterText] = useState<string>("unapproved");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [searchText, setSearchText] = useState<string>("");

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFilterText(event.target.value);
  };

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
  };

  // let filteredItems: any;
  // if (filterText === "unapproved") {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() !== "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }

  const searchOption = [
    {
      id: 1,
      value: "fullname",
      label: "FullName",
    },
    {
      id: 2,
      value: "email",
      label: "Email",
    },
    {
      id: 3,
      value: "phone",
      label: "Phone Number",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
            width: "56px",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 24C16.971 24 21 21 21 15.75C21 13.5 20.25 9.75 17.25 6.75C17.625 9 15.375 9.75 15.375 9.75C16.5 6 13.5 0.75 9 0C9.5355 3 9.75 6 6 9C4.125 10.5 3 13.0935 3 15.75C3 21 7.029 24 12 24ZM12 22.5C9.5145 22.5 7.5 21 7.5 18.375C7.5 17.25 7.875 15.375 9.375 13.875C9.1875 15 10.5 15.75 10.5 15.75C9.9375 13.875 11.25 10.875 13.5 10.5C13.2315 12 13.125 13.5 15 15C15.9375 15.75 16.5 17.046 16.5 18.375C16.5 21 14.4855 22.5 12 22.5Z"
              fill="#DA2128"
            />
          </svg>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
            Top Merchant
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#999" }}>
            Top merchant based on most topup
          </Typography>
        </Box>
      </Box>
      <DataTables
        // value={filterText}
        // searchOption={searchOption}
        // valueSearchBy={searchBy}
        // onChange={handleChange}
        // onChangeSearch={handleChangeSearch}
        // onChangeSearchBy={handleChangeSearchBy}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default DataTableComponent;
