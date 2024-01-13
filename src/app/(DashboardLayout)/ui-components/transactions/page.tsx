"use client";
import { Grid, Paper } from "@mui/material";
import TransactionsData from "@/app/(DashboardLayout)/components/transactions/List";
import PageContainer from "../../components/container/PageContainer";

const TransactionsManagement = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <TransactionsData />
      </Grid>
    </Grid>
  );
};

export default TransactionsManagement;
