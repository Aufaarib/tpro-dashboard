"use client";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Box, Grid, Link, Typography } from "@mui/material";
import { IconBuildingStore } from "@tabler/icons-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewMerchant = () => {
  const searchParams = useSearchParams();
  // const { usersData } = useAppContext();
  const [merchantData, setMerchantData] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();

  const onCancel = () => {
    router.replace("/ui-components/merchant");
  };

  const postMerchant = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE + "/ms/v1/merchants",
        {
          name,
          description,
          parent_id: parent,
          level,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then((res) => {})
      .catch((error) => {});
  };

  const levels = [
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
  ];

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

  const usersOptions = merchantData.map((c: any) => ({
    label: `${c.name}`,
    value: c.merchant_id,
  }));

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
      New Merchant
    </Typography>,
  ];

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            detailInformation="Please enter Merchant Name, Description, Level and Parent"
            formTitle="New Merchant Form"
            title="New Merchant"
            onPost={postMerchant}
            onCancel={() => onCancel()}
            icon={<IconBuildingStore />}
            breadcrumbs={breadcrumbs}
          >
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Name"
              required={true}
            />
            <Dropdown
              onChange={(e: any) => setParent(e.target.value)}
              label="Parent"
              required={true}
              value={parent}
              options={usersOptions}
            />
            <Dropdown
              onChange={(e: any) => setLevel(e.target.value)}
              label="Level"
              required={true}
              value={level}
              options={levels}
            />
            <TextFields
              label="Description"
              onChange={(e: any) => setDescription(e.target.value)}
              // required={true}
            />
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewMerchant;
