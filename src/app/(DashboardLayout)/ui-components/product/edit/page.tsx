"use client";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Grid } from "@mui/material";
import axios from "axios";
import { toInteger } from "lodash";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  name: string;
  price: number;
  status: string;
  qty: string;
  note: string;
  description: string;
  images: [{ id: number; image_url: string }];
};

const EditProduct = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [merchantData, setMerchantData] = useState([]);
  const [merchant_id, setMerchantId] = useState(
    searchParams.get("merchant_id")
  );
  const [product_code, setProductCode] = useState(
    searchParams.get("product_code")
  );
  const [name, setName] = useState(searchParams.get("product_name"));
  const [description, setDescription] = useState(
    searchParams.get("description")
  );
  const [type, setType] = useState(searchParams.get("type"));
  const [price, setPrice] = useState(searchParams.get("price"));

  const getMerchant = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + `/ms/v1/merchants`, {
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

  const editProduct = () => {
    axios
      .put(
        process.env.NEXT_PUBLIC_BASE +
          `/ps/v1/products/${searchParams.get("product_id")}`,
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

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            title="Edit Product"
            formTitle="Edit Product Form"
            detailInformation="Edit Code, Name, Merchant, Price, Type and Description"
            onPost={editProduct}
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

export default EditProduct;
