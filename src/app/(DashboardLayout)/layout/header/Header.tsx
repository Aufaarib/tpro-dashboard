import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import Search from "./Search";
import {
  IconAlignBoxRightMiddle,
  IconArrowBadgeRight,
  IconArrowRightSquare,
  IconLogout,
  IconMenu2,
  IconSquareArrowRight,
  IconSquareRoundedArrowRight,
} from "@tabler/icons-react";
import { IconSquareRoundedArrowRightFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/ui-components/auth");
  };
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled
      sx={{ boxShadow: "0px 4px 4px 0px rgba(51, 57, 83, 0.04)" }}
      position="sticky"
      // color="default"
    >
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu2 width="20" height="20" />
        </IconButton>
        {/* <Search/> */}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            onClick={() => onLogout()}
            style={{
              borderRadius: 0,
              fontSize: "14px",
              fontWeight: 400,
              display: "flex",
              color: "#333",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <IconLogout /> Logout
          </IconButton>
          {/* <Profile /> */}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
