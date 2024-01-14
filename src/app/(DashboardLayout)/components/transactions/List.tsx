import axios from "axios";
import { useEffect, useState } from "react";
import BaseCard from "../shared/ContentCard";
import DataTableComponent from "./DataTable";
import { useAppContext } from "../shared/Context";
import { Link, Typography } from "@mui/material";
import { IconCreditCard } from "@tabler/icons-react";

const List = () => {
  const [transactionsData, setTransactionsData] = useState([]);

  const getTransaction = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ts/v1/transaction", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setTransactionsData(res.data.body);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getTransaction();
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
        title="Transactions"
        breadcrumb={breadcrumbs}
        path="/ui-components/product/new-product"
        icon={<IconCreditCard />}
      >
        <DataTableComponent data={transactionsData} />
      </BaseCard>
    </>
  );
};

export default List;
