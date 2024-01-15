"use client";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Box, Grid, Link, Typography } from "@mui/material";
import { IconBucket } from "@tabler/icons-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewBucket = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const router = useRouter();

  const onCancel = () => {
    router.replace("/ui-components/merchant/bucket");
  };

  useEffect(() => {
    getMerchantDetail();
  }, []);

  const getMerchantDetail = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/merchant/fetch/${searchParams.get("id")}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        // setData(res.data.body);
      })
      .catch((error) => {});
  };

  console.log(parent);
  console.log(name);

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
    <Link
      underline="hover"
      key="1"
      color="inherit"
      fontSize="13px"
      href="/ui-components/merchant/bucket"
    >
      Buckets
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      New Bucket
    </Typography>,
  ];

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            detailInformation="Please enter Bucket Name and Description"
            formTitle="New Bucket Form"
            title="New Bucket"
            icon={<IconBucket />}
            breadcrumbs={breadcrumbs}
            onCancel={() => onCancel()}
          >
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Name"
              required={true}
            />
            <TextFields
              label="Description"
              onChange={(e: any) => setName(e.target.value)}
              // required={true}
            />
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewBucket;
