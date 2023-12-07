import {
  Box,
  Button,
  Chip,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconEye } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import BaseCard from "../shared/DashboardCard";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  status: string;
  oauth: { fullname: string; email: string; phone: string };
};

const List = () => {
  const [data, setData] = useState([
    // {
    //   id: 1,
    //   fullname: "mmak",
    //   email: "mmak@gmail",
    //   phone: 8221122,
    //   status: "approved",
    //   oauth: {
    //     fullname: "dsddsdsd",
    //     email: "dsadadd@gmail.com",
    //     phone: "082299229922",
    //   },
    // },
    // {
    //   id: 2,
    //   fullname: "mmak",
    //   email: "mmak@gmail",
    //   phone: 8221122,
    //   status: "approved",
    //   oauth: {
    //     fullname: "dsddsdsd",
    //     email: "dsadadd@gmail.com",
    //     phone: "082299229922",
    //   },
    // },
  ]);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
    getDetonator();
  }, []);

  const getDetonator = () => {
    axios
      .get("https://api.foodia-dev.nuncorp.id/api/v1/detonator/filter", {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
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
              getDetonator();
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
              getDetonator();
              setIsOpen(false);
            })
            .catch((error) => {});
    }
  };

  return (
    <>
      <BaseCard title="Detonator Management">
        <TableContainer
          sx={{
            width: {
              xs: "274px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Fullname
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Phone number
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((product: Props) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {product.oauth.fullname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {product.oauth.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {product.oauth.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor:
                          product.status === "approved"
                            ? "success.main"
                            : product.status === "rejected"
                            ? "error.main"
                            : "warning.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={product.status}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Link
                        href={{
                          pathname: "/ui-components/detonator/info",
                          query: {
                            id: product.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small" color="info">
                          <IconEye size={20} /> View
                        </Button>
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>

      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "10px",
            flexDirection: "column",
            alignItems: "center",
            width: "auto",
            backgroundColor: "white",
            padding: "35px",
            gap: "30px",
          }}
        >
          <Typography
            style={{ display: "flex", flexDirection: "row", gap: "5px" }}
          >
            {status === "approved" ? "Approve" : "Reject"}{" "}
            <Typography style={{ fontWeight: "bold" }}>{name}</Typography> ?
          </Typography>
          {status === "approved" ? (
            ""
          ) : (
            <TextField
              onChange={(e) => setNote(e.target.value)}
              label="Note :"
              variant="outlined"
              type="text"
              helperText="*This Field Must be Filled"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={() => Approvals(ids, status)}>
              {status === "approved" ? "Approve" : "Reject"}{" "}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default List;
