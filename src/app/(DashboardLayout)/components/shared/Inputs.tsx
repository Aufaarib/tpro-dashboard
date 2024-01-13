import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";

type Props = {
  label?: any;
  required?: any;
  value?: any;
  onChange?: any;
  options?: any;
};

export const TextFields = ({ label, required, onChange, value }: Props) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#333",
          fontWeight: 600,
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        {label}
        {/* {required ? (
          <Typography
            sx={{ color: "#ED0226", fontSize: "14px", fontWeight: 600 }}
          >
            *
          </Typography>
        ) : (
          ""
        )} */}
      </Typography>
      <TextField
        onChange={onChange}
        value={value}
        sx={{
          width: "100%",
          border: "1.2px solid #EBEBEB",
          // backgroundColor: "#a3181d",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            // color: "white",
            "& fieldset": {
              border: "none", // Remove the border
            },
          },
        }}
      />
    </Box>
  );
};

export const Dropdown = ({
  value,
  label,
  required,
  onChange,
  options,
}: Props) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#333",
          fontWeight: 600,
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        {label}
        {/* {required ? (
          <Typography
            sx={{ color: "#ED0226", fontSize: "14px", fontWeight: 600 }}
          >
            *
          </Typography>
        ) : (
          ""
        )} */}
      </Typography>
      <Select
        sx={{
          width: "50%",
          border: "1.2px solid #EBEBEB",
          // backgroundColor: "#a3181d",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            // color: "white",
            "& fieldset": {
              border: "none", // Remove the border
            },
          },
        }}
        onChange={onChange}
        value={value}
      >
        {options?.map((data: any) => (
          <MenuItem value={data.id}>{data.fullname}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};
