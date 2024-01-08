import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import BackgroundImage from "@/utils/Rectangle 60.png";
import Image from "next/image";
import Logo from "../../layout/shared/logo/Logo";
import door from "@/utils/DoorOpen.png";
import { IconEye, IconLock, IconUser } from "@tabler/icons-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const theme = useTheme();

  const onLogin = () => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_BASE + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const role = res?.data?.body.role;
        const email = res?.data?.body.email;
        const token = res?.data.body.token;
        const username = res?.data?.body.fullname;
        Cookies.set("role", role);
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USERNAME", username);
        localStorage.setItem("ROLE", role);
        localStorage.setItem("EMAIL", email);
        if (role === "detonator") {
          router.push("/ui-components/detonator");
        } else {
          router.refresh();
          // window.location.href = "/authentication/sign-in";
        }
        // setIsLoading(false);
      })
      .catch((error) => {
        // if (error.code === "ERR_NETWORK") {
        //   AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        // } else {
        //   AlertMessage(
        //     "Gagal",
        //     "Email atau Password Tidak Sesuai",
        //     "Coba Lagi",
        //     "error"
        //   );
        // }
        console.log("error");
        setIsLoading(false);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid black",
          width: "100%",
          backgroundColor: "gray",
          gap: "15px",
          position: "relative",
        }}
      >
        <Image src={BackgroundImage} alt="NotFound" layout="fill" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            backgroundColor: "rgba(25, 28, 40, 0.80)",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ padding: "45px" }}>
            <Logo />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: "80px",
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginTop: "90px",
                flexDirection: "column",
                justifyContent: "center",
                marginRight: "40px",
              }}
            >
              <hr style={{ width: "64px", height: 0 }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "80px",
                flexDirection: "column",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  letterSpacing: "25.2px",
                }}
              >
                WELCOME
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    lineHeight: "normal",
                    marginRight: "200px",
                  }}
                >
                  Explore and manage your work here!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
          height: "100%",
          width: "40%",
          backgroundImage: "linear-gradient(180deg, #E32229 0%, #A7181E 100%)",
          padding: "70px",
          gap: "15px",
        }}
      >
        <Image src={door} alt="NotFound" width={64} height={64} />
        <Typography
          color="textSecondary"
          variant="h6"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "start",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          Sign in with your account
        </Typography>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          // label="Username"
          placeholder="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ color: "white" }} position="start">
                <IconUser />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            backgroundColor: "#a3181d",
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                border: "none", // Remove the border
              },
            },
          }}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ color: "white" }} position="start">
                <IconLock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "white" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            backgroundColor: "#a3181d",
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                border: "none", // Remove the border
              },
            },
          }}
        />
        <Button
          onClick={() => onLogin()}
          style={{
            width: "100%",
            height: "56px",
            backgroundColor: "white",
            fontWeight: 600,
            color: "#333",
            borderRadius: "15px",
          }}
        >
          {isLoading ? (
            <CircularProgress size="20px" sx={{ color: "white" }} />
          ) : (
            ""
          )}
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
