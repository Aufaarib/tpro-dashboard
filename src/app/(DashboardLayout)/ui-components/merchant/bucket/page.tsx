"use client";
import BucketData from "@/app/(DashboardLayout)/components/merchant/bucket/List";
import { Grid } from "@mui/material";

const BucketManagement = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BucketData />
      </Grid>
    </Grid>
  );
};

export default BucketManagement;
