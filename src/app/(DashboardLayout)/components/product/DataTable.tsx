import { Button, Stack, Chip, SelectChangeEvent } from "@mui/material";
import { IconEye, IconPencil } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import CustomStylesTable from "../shared/CustomStylesTable";
import DataTables from "../shared/DataTables";
import { KeyboardArrowDown } from "@mui/icons-material";
import { toInteger } from "lodash";

interface Data {
  id: number;
  merchant_id: number;
  product_code: string;
  name: string;
  description: string;
  type: number;
  price: number;
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
    name: "Code",
    cell: (row: Data) => <div>{row.product_code}</div>,
    // sortable: true,
  },
  {
    name: "Name",
    cell: (row: Data) => <div>{row.name}</div>,
    // sortable: true,
  },
  {
    name: "Description",
    cell: (row: Data) => <div>{row.description}</div>,
    // sortable: true,
    width: "260px",
  },
  {
    name: "Tipe",
    cell: (row: Data) => <div>{row.type}</div>,
    // sortable: true,
    width: "100px",
  },
  {
    name: "Price",
    cell: (row: Data) => (
      <div>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.price)}
      </div>
    ),
    // sortable: true,
  },
  {
    name: "Action",
    cell: (row: Data) => (
      <Stack spacing={1} direction="row">
        <Link
          href={{
            pathname: "/ui-components/product/edit",
            query: {
              product_id: row.id,
              merchant_id: row.merchant_id,
              product_code: row.product_code,
              product_name: row.name,
              description: row.description,
              type: row.type,
              price: toInteger(row.price),
            },
          }}
        >
          <Button
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
            <IconPencil />
            Edit
          </Button>
        </Link>
      </Stack>
    ),
    // sortable: true,
  },
  // Add more columns as needed
];

const DataTableComponent: React.FC<Props> = ({
  data,
  meta,
  onChange,
  page,
}) => {
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
