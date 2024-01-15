import { Link, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContentCard from "../../shared/ContentCard";
import { useAppContext } from "../../shared/Context";
import DataTableComponent from "./DataTable";
import { IconBucket } from "@tabler/icons-react";

const List = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getBucket();
  }, []);

  console.log(data);

  const getBucket = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ms/v1/merchants/00037716-482a-4d2e-aa2a-b648cd5f7afb`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setData(res.data.body.bucket);
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
      href="/ui-components/merchant"
    >
      Merchants
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Buckets
    </Typography>,
  ];

  return (
    <>
      <ContentCard
        title="Bucket"
        breadcrumb={breadcrumbs}
        path="/ui-components/merchant/bucket/new-bucket"
        icon={<IconBucket />}
      >
        {/* <DataTableComponent data={data} /> */}
      </ContentCard>
    </>
  );
};

export default List;
