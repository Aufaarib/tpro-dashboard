import { Box, Button, Link, Typography } from "@mui/material";
import { IconBuildingStore } from "@tabler/icons-react";
import ContentCard from "../shared/ContentCard";
import { Dropdown, TextFields } from "../shared/Inputs";
import React from "react";

type Props = {
  detailInformation?: any;
  title?: any;
  children?: React.ReactNode;
};

const Form = ({ detailInformation, title, children }: Props) => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      fontSize="13px"
      href="/"
      // onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      fontSize="13px"
      href="/material-ui/getting-started/installation/"
      // onClick={handleClick}
    >
      Core
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Breadcrumb
    </Typography>,
  ];
  return (
    <>
      <ContentCard
        icon={<IconBuildingStore />}
        title="New Merchant"
        breadcrumb={breadcrumbs}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "20%", padding: "20px 10px" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#000",
                fontWeight: 500,
                marginBottom: "15px",
              }}
            >
              Detail Information
            </Typography>
            <Typography
              sx={{
                color: "#999",
                fontSize: "14px",
                fontWeight: 400,
                width: "300px",
                lineHeight: "24px",
              }}
            >
              {detailInformation}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "70%",
              height: "513px",
              backgroundColor: "gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "0px 0px 24px 0px rgba(51, 57, 83, 0.06)",
            }}
          >
            <Typography sx={{ paddingY: "10px" }}>{title}</Typography>
            <Box
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {children}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Button
                  sx={{
                    height: "38px",
                    width: "120px",
                    borderRadius: "12px",
                    color: "black",
                    backgroundColor: "#EBEBEB",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    height: "38px",
                    width: "120px",
                    borderRadius: "12px",
                    color: "white",
                    backgroundColor: "#ED0226",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ContentCard>
    </>
  );
};

export default Form;
