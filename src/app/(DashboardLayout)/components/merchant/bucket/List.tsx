import { Link, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContentCard from "../../shared/ContentCard";
import { useAppContext } from "../../shared/Context";
import DataTableComponent from "./DataTable";
import { IconBucket } from "@tabler/icons-react";

interface Data {
  merchant_id?: number;
  bucket?: {
    balance?: number;
    name?: string;
    description?: string;
    level?: number;
  };
}

const List = () => {
  const [data, setData] = useState<Data>();

  const datas = [
    {
      merchant_id: data?.merchant_id,
      bucket: {
        name: data?.bucket?.name,
        balance: data?.bucket?.balance,
        description: data?.bucket?.description,
        level: data?.bucket?.level,
      },
    },
  ];

  useEffect(() => {
    getBucket();
  }, []);

  const getBucket = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ms/v1/merchants/${localStorage.getItem("Merchant_id")}`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
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
        // path="/ui-components/merchant/bucket/new-bucket"
        icon={<IconBucket />}
      >
        <DataTableComponent data={datas} />
      </ContentCard>
    </>
  );
};

export default List;
