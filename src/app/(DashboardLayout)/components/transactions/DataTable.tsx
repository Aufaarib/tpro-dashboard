import { Button, Stack, Chip, SelectChangeEvent } from "@mui/material";
import { IconEye, IconPencil } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import CustomStylesTable from "../shared/CustomStylesTable";
import DataTables from "../shared/DataTables";
import { KeyboardArrowDown } from "@mui/icons-material";

interface Data {
  id: number;
  amount: number;
  msisdn: string;
  serial_number: string;
  denomination: string;
  type: string;
  status: string;
  created_at: string;
  merchant: { name: string };
}

interface Props {
  data: Data[];
}

const columns: TableColumn<Data>[] = [
  {
    name: "No",
    selector: (_row, i: any) => i + 1,
    // sortable: true,
    width: "70px",
    style: {
      paddingLeft: "30px",
    },
  },
  {
    name: "Name",
    cell: (row: Data) => <div>{row.merchant.name}</div>,
    // sortable: true,
    width: "auto",
  },
  {
    name: "Amount",
    cell: (row: Data) => <div>{row.amount}</div>,
    // sortable: true,
    width: "100px",
  },
  {
    name: "Msisdn",
    cell: (row: Data) => <div>{row.msisdn}</div>,
    // sortable: true,
    width: "auto",
  },
  {
    name: "Serial Number",
    cell: (row: Data) => <div>{row.serial_number}</div>,
    // sortable: true,
    width: "auto",
  },
  {
    name: "Denomination",
    cell: (row: Data) => <div>{row.denomination}</div>,
    // sortable: true,
    width: "auto",
  },
  {
    name: "Type",
    cell: (row: Data) => <div>{row.type}</div>,
    // sortable: true,
    width: "90px",
  },
  {
    name: "Status",
    cell: (row: Data) => <div>{row.status}</div>,
    // sortable: true,
    width: "110px",
  },
  {
    name: "Created At",
    cell: (row: Data) => <div>{row.created_at}</div>,
    // sortable: true,
    width: "auto",
  },
  // {
  //   name: "Action",
  //   cell: (row: Data) => (
  //     <Stack spacing={1} direction="row">
  //       <Link
  //         href={{
  //           // pathname: "/ui-components/detonator/info",
  //           query: {
  //             id: row.id,
  //           },
  //         }}
  //       >
  //         <Button
  //           sx={{
  //             border: "1.2px solid #191C28",
  //             color: "black",
  //             backgroundColor: "white",
  //             fontSize: "14px",
  //             fontWeight: 400,
  //             width: "115px",
  //             height: "32px",
  //             borderRadius: "8px",
  //             paddingX: "15px",
  //             ":hover": {
  //               backgroundColor: "#191C28",
  //             },
  //           }}
  //         >
  //           <IconPencil />
  //           Edit
  //         </Button>
  //       </Link>
  //     </Stack>
  //   ),
  //   // sortable: true,
  // },
  // Add more columns as needed
];

const DataTableComponent: React.FC<Props> = ({ data }) => {
  const [filterText, setFilterText] = useState<string>("unapproved");
  const [searchBy, setSearchBy] = useState<string>("name");
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
  //       (searchBy === "name"
  //         ? data.name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "price"
  //         ? data.price.toLowerCase().includes(searchText.toLowerCase())
  //         : data.description.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "name"
  //         ? data.name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "price"
  //         ? data.price.toLowerCase().includes(searchText.toLowerCase())
  //         : data.description.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }
  const searchOption = [
    {
      id: 1,
      value: "name",
      label: "Name",
    },
    {
      id: 2,
      value: "price",
      label: "Price",
    },
    {
      id: 3,
      value: "description",
      label: "Description",
    },
  ];

  return (
    <>
      <DataTables
        value={filterText}
        searchOption={searchOption}
        valueSearchBy={searchBy}
        onChange={handleChange}
        onChangeSearch={handleChangeSearch}
        onChangeSearchBy={handleChangeSearchBy}
        columns={columns}
        data={data}
        pagination={true}
      />
    </>
  );
};

export default DataTableComponent;
