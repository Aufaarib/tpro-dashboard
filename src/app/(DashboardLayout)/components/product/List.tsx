import { Link, Typography } from "@mui/material";
import BaseCard from "../shared/ContentCard";
import { useAppContext } from "../shared/Context";
import DataTableComponent from "./DataTable";
import axios from "axios";
import { useEffect, useState } from "react";

const List = () => {
  const [productData, setProductData] = useState([]);

  const getProduct = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ps/v1/products", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setProductData(res.data.body);
        // const isRejectedPresent: boolean = res.data.body.some(
        //   (obj: any) => obj.status === "rejected" || obj.status === "waiting"
        // );
        // // console.log(isRejectedPresent);
        // setIsUnapprovedProduct(isRejectedPresent);
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
    <Link
      underline="hover"
      key="1"
      color="inherit"
      fontSize="13px"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      fontSize="13px"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Breadcrumb
    </Typography>,
  ];

  return (
    <>
      <BaseCard
        title="Product"
        breadcrumb={breadcrumbs}
        path="/ui-components/product/new-product"
      >
        <DataTableComponent data={productData} />
      </BaseCard>
    </>
  );
};

export default List;
