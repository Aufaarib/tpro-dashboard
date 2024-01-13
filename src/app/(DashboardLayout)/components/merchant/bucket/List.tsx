import { Link, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContentCard from "../../shared/ContentCard";
import { useAppContext } from "../../shared/Context";
import DataTableComponent from "./DataTable";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBucket();
  }, []);

  const getBucket = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ms/v1/merchants", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setData(res.data.body);
      })
      .catch((error) => {});
  };

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
      <ContentCard
        title="Bucket"
        breadcrumb={breadcrumbs}
        path="/ui-components/merchant/bucket/new-bucket"
      >
        <DataTableComponent data={data} />
      </ContentCard>
    </>
  );
};

export default List;
