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
  const { usersData } = useAppContext();

  console.log(usersData);

  const getMerchant = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ms/v1/merchants", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setMerchantData(res.data.body);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMerchant();
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
        title="Merchant"
        breadcrumb={breadcrumbs}
        path="/ui-components/merchant/new-merchant"
        icon={<IconBuildingStore />}
      >
        <DataTableComponent data={merchantData} />
      </BaseCard>
    </>
  );
};

export default List;
