"use client";
import { Grid, Paper } from "@mui/material";
import ProductData from "@/app/(DashboardLayout)/components/product/List";
import PageContainer from "../../components/container/PageContainer";

const ProductManagement = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductData />
      </Grid>
    </Grid>
  );
};

export default ProductManagement;
