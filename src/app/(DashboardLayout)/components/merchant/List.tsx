import { useAppContext } from "../shared/Context";
import BaseCard from "../shared/ContentCard";
import DataTableComponent from "./DataTable";
import { Link, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const List = () => {
  const { merchantData } = useAppContext();
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      fontSize="13px"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      fontSize="13px"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Breadcrumb
    </Typography>,
  ];

  return (
    <>
      <BaseCard
        title="Merchant"
        breadcrumb={breadcrumbs}
        path="/ui-components/merchant/new-merchant"
      >
        <DataTableComponent data={merchantData} />
      </BaseCard>
    </>
  );
};

export default List;
