"use client";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Box, Grid, Link, Typography } from "@mui/material";
import { IconBucket } from "@tabler/icons-react";
import axios from "axios";
import { toInteger } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BucketTopup = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleInputChange = (event: any) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  const topupBucket = () => {
    const amounts = toInteger(amount.replace(/\./g, ""));
    axios
      .put(
        process.env.NEXT_PUBLIC_BASE +
          `/ms/v1/merchants/${localStorage.getItem(
            "Merchant_id"
          )}/bucket/topup`,
        {
          amount: amounts,
        },
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        // setData(res.data.body);
      })
      .catch((error) => {});
  };

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
      Bucket
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Topup Bucket
    </Typography>,
  ];

  const onCancel = () => {
    router.replace("/ui-components/merchant/bucket");
  };

  return (
    <>
      <Form
        detailInformation="Please enter Amount"
        formTitle="Topup Bucket Form"
        title="Topup Bucket"
        icon={<IconBucket />}
        breadcrumbs={breadcrumbs}
        onPost={() => topupBucket()}
        onCancel={() => onCancel()}
      >
        <TextFields
          onChange={handleInputChange}
          label="Amount"
          required={true}
          value={amount}
        />
      </Form>
    </>
  );
};

export default BucketTopup;
