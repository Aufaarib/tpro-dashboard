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

type dropdown = {
  id: number;
  fullname: number;
};

const EditMerchant = () => {
  const searchParams = useSearchParams();
  const { usersData } = useAppContext();
  const [merchantData, setMerchantData] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(`${localStorage.getItem("Name")}`);
    setDescription(`${localStorage.getItem("Description")}`);
    setParent(`${localStorage.getItem("Merchant_id")}`);
    setLevel(`${localStorage.getItem("Level")}`);
  }, []);

  const editMerchant = () => {
    axios
      .put(
        process.env.NEXT_PUBLIC_BASE +
          `/ms/v1/merchants/${localStorage.getItem("Merchant_id")}`,
        {
          name,
          description,
          user_id: parseInt(parent),
          level: parseInt(level),
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then((res) => {})
      .catch((error) => {});
  };

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

  const usersOptions = merchantData.map((c: any) => ({
    label: `${c.name}`,
    value: c.merchant_id,
  }));

  const onCancel = () => {
    router.replace("/ui-components/merchant");
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
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Edit Merchant
    </Typography>,
  ];

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            detailInformation="Edit Merchant Name, Description, Level and Parent"
            formTitle="Edit Merchant Form"
            title="Edit Merchant"
            onPost={editMerchant}
            onCancel={() => onCancel()}
            icon={<IconBuildingStore />}
            breadcrumbs={breadcrumbs}
          >
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Name"
              required={true}
              value={name}
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
              value={description}
              // required={true}
            />
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditMerchant;
