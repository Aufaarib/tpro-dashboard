import { Box, Stack, StepIconProps, Typography } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  status?: string;
};

const DashboardCard = ({ title, subtitle, children, action }: Props) => {
  return (
    <Stack sx={{ padding: "18px", gap: "30px" }} mb={1}>
      <Box>
        {title ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: 700,
                // marginBottom: "20px",
                color: "#000",
              }}
            >
              {title}
            </Typography>
          </Box>
        ) : (
          ""
        )}

        {subtitle ? (
          <Typography variant="subtitle2" color="textSecondary">
            {subtitle}
          </Typography>
        ) : (
          ""
        )}
      </Box>
      {action}
      {children}
    </Stack>
  );
};

export default DashboardCard;
