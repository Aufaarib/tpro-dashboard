"use client";
import Attachment from "@/app/(DashboardLayout)/components/detonator/Attachment";
import Info from "@/app/(DashboardLayout)/components/detonator/Info";
import ModalPopup from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import { Label } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconClock } from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  ktp_number: string;
  status: string;
  oauth: { fullname: string; email: string; phone: string };
};

const DetonatorInfo = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [data, setData] = useState<Props>({
    id: 0,
    ktp_number: "",
    status: "",
    oauth: { fullname: "", email: "", phone: "" },
  });

  const handleOpen = (id: number, status: string, name: string) => {
    setIsOpen(true);
    setName(name);
    setId(id);
    setStatus(status);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getDetonatorDetail();
  }, []);

  const getDetonatorDetail = () => {
    axios
      .get(
        `https://api.foodia-dev.nuncorp.id/api/v1/detonator/fetch/${searchParams.get(
          "id"
        )}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        setData(res.data.body);
      })
      .catch((error) => {});
  };

  console.log(status);

  const Approvals = (id: number, status: string) => {
    {
      status === "approved"
        ? axios
            .put(
              `https://api.foodia-dev.nuncorp.id/api/v1/detonator/approval/${id}`,
              {
                status,
                note: "approved",
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                },
              }
            )
            .then((res) => {
              getDetonatorDetail();
              setIsOpen(false);
            })
            .catch((error) => {})
        : note === ""
        ? console.log("Note Empty")
        : axios
            .put(
              `https://api.foodia-dev.nuncorp.id/api/v1/detonator/approval/${id}`,
              {
                status,
                note,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                },
              }
            )
            .then((res) => {
              getDetonatorDetail();
              setIsOpen(false);
            })
            .catch((error) => {});
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} lg={6}>
          <Info data={data} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Attachment />
          <Box
            marginTop="70px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            color="white"
          >
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="15px"
              padding="5px 15px"
              sx={
                data.status === "approved"
                  ? { backgroundColor: "success.main" }
                  : data.status === "rejected"
                  ? { backgroundColor: "error.main" }
                  : { backgroundColor: "warning.main" }
              }
            >
              {data.status === "approved" ? (
                <>
                  Approved <IconCircleCheck />
                </>
              ) : data.status === "rejected" ? (
                <>
                  Rejected <IconBan />
                </>
              ) : (
                <>
                  Waiting <IconClock />
                </>
              )}
            </Typography>
            <Stack
              display="flex"
              justifyContent="center"
              spacing={1}
              direction="row"
            >
              <Button
                variant="contained"
                size="small"
                disabled={data.status === "approved"}
                onClick={() =>
                  handleOpen(data.id, "approved", data.oauth.fullname)
                }
                color="success"
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={data.status === "rejected"}
                onClick={() =>
                  handleOpen(data.id, "rejected", data.oauth.fullname)
                }
                color="error"
              >
                <IconBan size={16} /> Reject
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <ModalPopup
        open={isOpen}
        handleClose={handleClose}
        status={status}
        name={name}
        note={note}
        onChange={(e: any) => setNote(e.target.value)}
        handleSubmit={() => Approvals(ids, status)}
      />
    </>
  );
};

export default DetonatorInfo;
