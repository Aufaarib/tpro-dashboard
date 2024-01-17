"use client";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Grid, Link, Typography } from "@mui/material";
import { IconBuildingStore, IconShoppingBag } from "@tabler/icons-react";
import axios from "axios";
import { toInteger } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  name: string;
  price: string;
  status: string;
  qty: string;
  note: string;
  description: string;
  images: [{ id: number; image_url: string }];
};

const NewProduct = () => {
  const searchParams = useSearchParams();
  const [description, setDescription] = useState("");
  const [merchant_id, setMerchantId] = useState<number>(0);
  const [product_code, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [merchantData, setMerchantData] = useState([]);
  const router = useRouter();

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

  const newProduct = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE + `/ps/v1/products`,
        {
          merchant_id,
          product_code,
          name,
          description,
          type,
          price: toInteger(price),
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then((res) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    getMerchant();
  }, []);

  const prices = [
    {
      value: 1000,
      label: 1000,
    },
    {
      value: 2000,
      label: 2000,
    },
  ];

  const types = [
    {
      value: "pulsa",
      label: "Pulsa",
    },
    {
      value: "kuota",
      label: "Kuota",
    },
  ];

  const merchantOptions = merchantData.map((c: any) => ({
    label: `${c.name}`,
    value: c.merchant_id,
  }));

  const onCancel = () => {
    router.replace("/ui-components/product");
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      fontSize="13px"
      href="/ui-components/product"
    >
      Products
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      New Product
    </Typography>,
  ];

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            title="New Product"
            formTitle="New Product Form"
            detailInformation="Please enter Code, Name, Merchant, Price, Type and Description"
            onPost={newProduct}
            onCancel={() => onCancel()}
            icon={<IconShoppingBag />}
            breadcrumbs={breadcrumbs}
          >
            <TextFields
              onChange={(e: any) => setProductCode(e.target.value)}
              label="Code"
              required={true}
              value={product_code}
            />
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Name"
              required={true}
              value={name}
            />
            <Dropdown
              onChange={(e: any) => setMerchantId(e.target.value)}
              label="Merchant"
              required={true}
              value={merchant_id}
              options={merchantOptions}
            />
            <Dropdown
              onChange={(e: any) => setPrice(e.target.value)}
              label="Price"
              required={true}
              value={price}
              options={prices}
            />
            <Dropdown
              onChange={(e: any) => setType(e.target.value)}
              label="Type"
              required={true}
              value={type}
              options={types}
            />
            <TextFields
              onChange={(e: any) => setDescription(e.target.value)}
              label="Description"
              value={description}
              // required={true}
            />
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewProduct;
