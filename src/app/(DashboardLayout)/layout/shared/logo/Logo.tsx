import Link from "next/link";
import { styled, Typography } from "@mui/material";
import logo from "@/utils/New Project 1.png";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="NotFound"
      width={120} // Set the desired width
      height={70} // Set the desired height
    />
  );
};

export default Logo;
