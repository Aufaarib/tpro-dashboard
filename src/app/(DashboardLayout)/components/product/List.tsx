import { Link, Typography } from "@mui/material";
import BaseCard from "../shared/ContentCard";
import { useAppContext } from "../shared/Context";
import DataTableComponent from "./DataTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconBuildingStore, IconShoppingBag } from "@tabler/icons-react";

const List = () => {
  const [productData, setProductData] = useState([]);
  const [productMeta, setProductMeta] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getProduct(value);
  };

  console.log(productMeta);

  const getProduct = (value?: any) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ps/v1/products?page=${value}&per_page=1`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setProductData(res.data.body);
        setProductMeta(res.data.meta);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getProduct();
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Products
    </Typography>,
  ];

  return (
    <>
      <BaseCard
        title="Product"
        breadcrumb={breadcrumbs}
        path="/ui-components/product/new-product"
        icon={<IconShoppingBag />}
      >
        <DataTableComponent
          onChange={handleChange}
          page={page}
          meta={productMeta}
          data={productData}
        />
      </BaseCard>
    </>
  );
};

export default List;
