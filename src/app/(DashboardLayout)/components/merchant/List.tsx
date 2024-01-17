import { useAppContext } from "../shared/Context";
import BaseCard from "../shared/ContentCard";
import DataTableComponent from "./DataTable";
import { Link, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconBuildingStore } from "@tabler/icons-react";

const List = () => {
  const [merchantData, setMerchantData] = useState([]);
  const [merchantMeta, setMerchantMeta] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getMerchant(value);
  };

  console.log(merchantMeta);

  const getMerchant = (value?: any) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ms/v1/merchants?page=${value}&per_page=5`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setMerchantData(res.data.body);
        setMerchantMeta(res.data.meta);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMerchant();
  }, []);

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Merchants
    </Typography>,
  ];

  return (
    <>
      <BaseCard
        title="Merchant"
        breadcrumb={breadcrumbs}
        path="/ui-components/merchant/new-merchant"
        icon={<IconBuildingStore />}
      >
        <DataTableComponent
          onChange={handleChange}
          page={page}
          meta={merchantMeta}
          data={merchantData}
        />
      </BaseCard>
    </>
  );
};

export default List;
