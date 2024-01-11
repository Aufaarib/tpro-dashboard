"use client";
import Form from "@/app/(DashboardLayout)/components/merchant/Form";
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
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

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

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            detailInformation="Please enter Merchan Name, Description, Level and Parent"
            title="New Merchant Form"
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
            />
            <Dropdown
              onChange={(e: any) => setParent(e.target.value)}
              label="Level"
              required={true}
              value={parent}
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

export default NewMerchant;
