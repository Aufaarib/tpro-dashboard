"use client";
import { Grid, Paper } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DetonatorData from "@/app/(DashboardLayout)/components/dashboard/List";
import Login from "../../components/auth/login";

const AuthManagement = () => {
  return (
    <PageContainer title="Login" description="please login">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Login />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AuthManagement;
