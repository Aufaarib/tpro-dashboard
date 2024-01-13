"use client";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewMerchant = () => {
  const searchParams = useSearchParams();
  const { usersData } = useAppContext();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");

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
      id: 1,
      fullname: 1,
    },
    {
      id: 2,
      fullname: 2,
    },
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
              options={usersData}
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
