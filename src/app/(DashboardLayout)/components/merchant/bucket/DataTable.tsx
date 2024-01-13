import {
  Box,
  Button,
  Fade,
  Menu,
  MenuItem,
  MenuList,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import DataTables from "../../shared/DataTables";
import axios from "axios";

interface Data {
  merchant_id: number;
  name: string;
  description: string;
  level: number;
  bucket: { balance: number };
}

interface Props {
  data: Data[];
}

const DataTableComponent: React.FC<Props> = ({ data }) => {
  const [filterText, setFilterText] = useState<string>("unapproved");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      width: "auto",
    },
    {
      name: "Description",
      cell: (row: Data) => <div>{row.description}</div>,
      // sortable: true,
      width: "300px",
    },
    {
      name: "Balance",
      cell: (row: Data) => <div>{row.level}</div>,
      // sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      cell: (row: Data, index) => (
        <div>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#191C28",
              fontSize: "14px",
              fontWeight: 600,
              height: "32px",
              borderRadius: "8px",
              paddingX: "15px",
              ":hover": {
                backgroundColor: "#191C28",
              },
            }}
            aria-controls={open ? "fade-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Manage
            <KeyboardArrowDown />
          </Button>
          <Menu
            sx={{ borderRadius: "10px 0px 10px 10px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem>
              <Link
                href={{
                  pathname: "/ui-components/merchant/bucket/edit",
                  query: {
                    id: row.merchant_id,
                  },
                }}
              >
                {/* <Button
                sx={{
                  border: "1.2px solid #191C28",
                  color: "black",
                  backgroundColor: "white",
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "115px",
                  height: "32px",
                  borderRadius: "8px",
                  paddingX: "15px",
                  ":hover": {
                    backgroundColor: "#191C28",
                  },
                }}
                >
                </Button> */}
                <IconPencil />
                Edit
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={{
                  pathname: "/ui-components/merchant/bucket/topup",
                  query: {
                    id: row.merchant_id,
                  },
                }}
              >
                {/* <Button
                sx={{
                  border: "1.2px solid #191C28",
                  color: "black",
                  backgroundColor: "white",
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "115px",
                  height: "32px",
                  borderRadius: "8px",
                  paddingX: "15px",
                  ":hover": {
                    backgroundColor: "#191C28",
                  },
                }}
                >
                </Button> */}
                <IconPencil />
                Topup
              </Link>
            </MenuItem>
          </Menu>
        </div>
      ),
      // sortable: true,
    },
    // Add more columns as needed
  ];

  const openEdit = () => {
    router.replace("/ui-components/bucket/edit");
  };

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
