"use client";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Box, Grid } from "@mui/material";
import { IconBuildingStore } from "@tabler/icons-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewMerchant = () => {
  const searchParams = useSearchParams();
  const { usersData } = useAppContext();
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
          user_id: parent,
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

  const usersOptions = usersData.map((c: any) => ({
    label: `${c.fullname}`,
    value: c.id,
  }));

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
