"use client";
import Form from "@/app/(DashboardLayout)/components/shared/Form";
import {
  Dropdown,
  TextFields,
} from "@/app/(DashboardLayout)/components/shared/Inputs";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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

const EditProduct = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // useEffect(() => {
  //   getDetonatorDetail();
  // }, []);

  // const getDetonatorDetail = () => {
  //   axios
  //     .get(
  //       process.env.NEXT_PUBLIC_BASE +
  //         `/merchant-product/fetch/${searchParams.get("id")}`,
  //       {
  //         headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  //       }
  //     )
  //     .then((res) => {
  //       setData(res.data.body);
  //     })
  //     .catch((error) => {});
  // };

  console.log(name);
  console.log(note);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Form
            title="Edit Product"
            formTitle="Edit Product Form"
            detailInformation="Edit Code, Name, Merchant, Price, Type and Description"
          >
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Code"
              required={true}
            />
            <TextFields
              onChange={(e: any) => setName(e.target.value)}
              label="Name"
              required={true}
            />
            <Dropdown
              onChange={(e: any) => setNote(e.target.value)}
              label="Merchant"
              required={true}
              value={ids}
            />
            <Dropdown
              onChange={(e: any) => setNote(e.target.value)}
              label="Price"
              required={true}
              value={ids}
            />
            <Dropdown
              onChange={(e: any) => setNote(e.target.value)}
              label="Type"
              required={true}
              value={ids}
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

export default EditProduct;
