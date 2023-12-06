import { useEffect, useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type Props = {
  id: string;
  ktp_number: string;
  status: string;
  oauth: { fullname: string; email: string; phone: string };
};

const Info = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Props>({
    id: "",
    ktp_number: "",
    status: "",
    oauth: { fullname: "", email: "", phone: "" },
  });

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

  return (
    <BaseCard title="Detonator Info">
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography>Fullname : </Typography>
          <TextField
            fullWidth
            id="name-basic"
            variant="outlined"
            defaultValue={data.oauth.fullname}
            disabled
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography>Phone Number : </Typography>
          <TextField
            fullWidth
            id="name-basic"
            variant="outlined"
            defaultValue={data.oauth.phone}
            disabled
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography>Email : </Typography>
          <TextField
            fullWidth
            id="name-basic"
            variant="outlined"
            defaultValue={data.oauth.email}
            disabled
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography>Nomor KTP : </Typography>
          <TextField
            fullWidth
            id="name-basic"
            variant="outlined"
            defaultValue={data.ktp_number}
            disabled
          />
        </Box>
      </Stack>
    </BaseCard>
  );
};

export default Info;
