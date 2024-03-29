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
import DataTables from "../shared/DataTables";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface Data {
  parent_id: number;
  merchant_id: string;
  name: string;
  description: string;
  level: number;
  bucket: { balance: number };
}
interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Props {
  data: Data[];
  meta: Meta[];
  onChange: any;
  page: any;
}

const DataTableComponent: React.FC<Props> = ({
  data,
  meta,
  onChange,
  page,
}) => {
  const [filterText, setFilterText] = useState<string>("unapproved");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    merchant_id: any,
    name: any,
    parent_id: any,
    level: any,
    description: any
  ) => {
    setAnchorEl(event.currentTarget);
    localStorage.setItem("Merchant_id", merchant_id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Parent_id", parent_id);
    localStorage.setItem("Level", level);
    localStorage.setItem("Description", description);
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
      name: "Level",
      cell: (row: Data) => <div>{row.level}</div>,
      // sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      cell: (row: Data) => (
        <>
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
            onClick={(e) =>
              handleClick(
                e,
                row.merchant_id,
                row.name,
                row.parent_id,
                row.level,
                row.description
              )
            }
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
            <Link
              href={{
                pathname: "/ui-components/merchant/edit",
                query: {
                  merchant_id: row.merchant_id,
                  name: row.name,
                },
              }}
            >
              <MenuItem
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: 400,
                  ":hover": {
                    color: "white",
                    backgroundColor: "#191C28",
                  },
                }}
              >
                <IconPencil />
                Edit
              </MenuItem>
            </Link>
            <Link
              href={{
                pathname: "/ui-components/merchant/bucket",
              }}
            >
              <MenuItem
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: 400,
                  ":hover": {
                    color: "white",
                    backgroundColor: "#191C28",
                  },
                }}
              >
                <IconEye />
                View Bucket
              </MenuItem>
            </Link>
          </Menu>
        </>
      ),
      // sortable: true,
    },
    // Add more columns as needed
  ];

  const openEdit = () => {
    router.replace("/ui-components/merchant/edit");
  };

  return (
    <>
      <DataTables
        value={filterText}
        searchOption={searchOption}
        valueSearchBy={searchBy}
        onChange={onChange}
        onChangeSearch={handleChangeSearch}
        onChangeSearchBy={handleChangeSearchBy}
        columns={columns}
        data={data}
        meta={meta}
        page={page}
        pagination={true}
      />
    </>
  );
};

export default DataTableComponent;
