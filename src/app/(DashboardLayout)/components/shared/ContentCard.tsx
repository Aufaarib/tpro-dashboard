import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Icon,
  Stack,
  StepIconProps,
  Typography,
} from "@mui/material";
import {
  IconAdCircle,
  IconArrowBarRight,
  IconArrowBigRightLine,
  IconArrowRight,
  IconArrowsRight,
  IconBuildingStore,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  title?: string;
  breadcrumb?: any;
  path?: any;
  icon?: any;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  status?: string;
};

const ContentCard = ({
  title,
  breadcrumb,
  children,
  action,
  path,
  icon,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFF",
          justifyContent: "space-between",
          borderBottom: "1px solid #EBEBEB",
          padding: "10px",
          paddingX: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {icon}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            {title ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  {title}
                </Typography>
              </Box>
            ) : (
              ""
            )}

            {breadcrumb ? (
              <Breadcrumbs
                separator={<KeyboardArrowRight fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumb}
              </Breadcrumbs>
            ) : (
              ""
            )}
          </Box>
        </Box>
        {path ? (
          <Link
            style={{
              padding: "5px 10px",
              backgroundColor: "#ED0226",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FFF",
              gap: "8px",
              display: "flex",
              alignItems: "center",
            }}
            href={path}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H8.5V13.5C8.5 13.6326 8.44732 13.7598 8.35355 13.8536C8.25979 13.9473 8.13261 14 8 14C7.86739 14 7.74021 13.9473 7.64645 13.8536C7.55268 13.7598 7.5 13.6326 7.5 13.5V8.5H2.5C2.36739 8.5 2.24021 8.44732 2.14645 8.35355C2.05268 8.25979 2 8.13261 2 8C2 7.86739 2.05268 7.74021 2.14645 7.64645C2.24021 7.55268 2.36739 7.5 2.5 7.5H7.5V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74021 2.05268 7.86739 2 8 2Z"
                fill="white"
              />
            </svg>
            New {title}
          </Link>
        ) : (
          ""
        )}
      </Box>
      {action}
      {children}
    </Box>
  );
};

export default ContentCard;
