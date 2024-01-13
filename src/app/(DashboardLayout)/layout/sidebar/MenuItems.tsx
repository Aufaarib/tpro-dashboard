"use client";
import {
  IconBuildingStore,
  IconCreditCard,
  IconHome,
  IconShoppingBag,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = () => {
  return [
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconHome,
      href: "/ui-components/dashboard",
      // submenu: [
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/detonator",
      //     name: "List Detonator",
      //     icon: <IconUser />,
      //     isUnapproved: isUnapprovedDetonator,
      //   },
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/campaign",
      //     name: "List Campaign",
      //     icon: <IconSpeakerphone />,
      //     isUnapproved: isUnapprovedCampaign,
      //   },
      // ],
    },
    {
      id: uniqueId(),
      title: "Merchant",
      icon: IconBuildingStore,
      href: "/ui-components/merchant",
      // submenu: [
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/merchant",
      //     name: "List Merchant",
      //     icon: <IconUser />,
      //     isUnapproved: isUnapprovedMerchant,
      //   },
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/product",
      //     name: "List Product",
      //     icon: <IconBurger />,
      //     isUnapproved: isUnapprovedProduct,
      //   },
      // ],
    },
    {
      id: uniqueId(),
      title: "Product",
      icon: IconShoppingBag,
      href: "/ui-components/product",
      // submenu: [
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/merchant",
      //     name: "List Merchant",
      //     icon: <IconUser />,
      //     isUnapproved: isUnapprovedMerchant,
      //   },
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/product",
      //     name: "List Product",
      //     icon: <IconBurger />,
      //     isUnapproved: isUnapprovedProduct,
      //   },
      // ],
    },
    {
      id: uniqueId(),
      title: "Transactions",
      icon: IconCreditCard,
      href: "/ui-components/transactions",
      // submenu: [
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/merchant",
      //     name: "List Merchant",
      //     icon: <IconUser />,
      //     isUnapproved: isUnapprovedMerchant,
      //   },
      //   {
      //     id: uniqueId(),
      //     href: "/ui-components/product",
      //     name: "List Product",
      //     icon: <IconBurger />,
      //     isUnapproved: isUnapprovedProduct,
      //   },
      // ],
    },
  ];
};

export default Menuitems;
