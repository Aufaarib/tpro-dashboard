import axios from "axios";
import { useEffect, useState } from "react";
import BaseCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";
import { useAppContext } from "../shared/Context";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import profile from "@/utils/Rectangle 16.png";
import {
  IconBuildingStore,
  IconCircle,
  IconCircle0Filled,
  IconCircleFilled,
  IconShoppingBag,
} from "@tabler/icons-react";

const List = () => {
  const { usersData } = useAppContext();
  const [merchantData, setMerchantData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [username, setUsername] = useState<any>("");
  const [role, setRole] = useState<any>("");

  console.log(usersData);

  const getMerchant = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE + `/ms/v1/merchants?page=1&per_page=5`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setMerchantData(res.data.body);
        // setMerchantMeta(res.data.meta);
      })
      .catch((error) => {});
  };

  const getProduct = (value?: any) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE +
          `/ps/v1/products?page=${value}&per_page=5`,
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        setProductData(res.data.body);
        // setProductMeta(res.data.meta);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getProduct();
    getMerchant();
    setUsername(localStorage.getItem("USERNAME"));
    setRole(localStorage.getItem("ROLE"));
  }, []);

  return (
    <BaseCard title="Dashboard">
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "red",
              width: "88%",
              padding: "40px",
              height: "165px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "linear-gradient(180deg, #DA2128 0%, #A7181E 100%)",
              borderRadius: "30px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <Image
                src={profile}
                alt="NotFound"
                width={100} // Set the desired width
                height={100} // Set the desired height
              />
              <Box>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.87)", fontSize: "16px" }}
                >
                  Halo
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontSize: "24px",
                    textTransform: "capitalize",
                  }}
                >
                  {username}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.87)",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  {role}
                </Typography>
              </Box>
              <IconCircleFilled
                style={{
                  position: "absolute",
                  marginLeft: "380px",
                  marginBottom: "75px",
                  border: "0px",
                  color: "rgba(255, 255, 255, 0.38)",
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {/* <Button
                sx={{
                  width: "140px",
                  height: "48px",
                  borderRadius: "10px",
                  color: "#FFF",
                  background: "rgba(255, 255, 255, 0.24)",
                }}
              >
                View Profile
              </Button> */}
            </Box>
          </Box>
          <Box
            sx={{
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              width: "20%",
            }}
          >
            <Box
              sx={{
                background: "rgba(218, 33, 40, 0.16)",
                width: "56px",
                height: "56px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                alignItems: "center",
              }}
            >
              <IconBuildingStore />
            </Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Total Merchant
            </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
              {merchantData.length}
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              width: "20%",
            }}
          >
            <Box
              sx={{
                background: "rgba(218, 33, 40, 0.16)",
                width: "56px",
                height: "56px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                alignItems: "center",
              }}
            >
              <IconShoppingBag />
            </Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Total Product
            </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
              {productData.length}
            </Typography>
          </Box>
        </Box>
        <DataTableComponent data={merchantData} />
      </>
    </BaseCard>
  );
};

export default List;
