import axios from "axios";
import { useEffect, useState } from "react";
import BaseCard from "../shared/ContentCard";
import DataTableComponent from "./DataTable";
import { useAppContext } from "../shared/Context";
import { Link, Typography } from "@mui/material";
import { IconCreditCard } from "@tabler/icons-react";

const List = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsMeta, seTransactionsMeta] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getTransaction(value);
  };

  console.log(transactionsMeta);

  const getTransaction = (value?: any) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ts/v1/transaction?page=${page}&per_page=5`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setTransactionsData(res.data.body);
        seTransactionsMeta(res.data.meta);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Transactions
    </Typography>,
  ];

  return (
    <>
      <BaseCard
        title="Transactions"
        breadcrumb={breadcrumbs}
        // path="/ui-components/transactions"
        icon={<IconCreditCard />}
      >
        <DataTableComponent
          onChange={handleChange}
          page={page}
          meta={transactionsMeta}
          data={transactionsData}
        />
      </BaseCard>
    </>
  );
};

export default List;
