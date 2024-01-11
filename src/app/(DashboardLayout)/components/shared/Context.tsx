// AppContext.tsx
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AppContextProps {
  // Define your context properties here
  isUnapprovedDetonator: boolean;
  setIsUnapprovedDetonator: React.Dispatch<React.SetStateAction<boolean>>;

  isUnapprovedCampaign: boolean;
  setIsUnapprovedCampaign: React.Dispatch<React.SetStateAction<boolean>>;

  isUnapprovedMerchant: boolean;
  setIsUnapprovedMerchant: React.Dispatch<React.SetStateAction<boolean>>;

  isUnapprovedProduct: boolean;
  setIsUnapprovedProduct: React.Dispatch<React.SetStateAction<boolean>>;

  campaignData: any;
  detonatorData: any;
  merchantData: any;
  productData: any;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUnapprovedDetonator, setIsUnapprovedDetonator] =
    React.useState<boolean>(false);

  const [isUnapprovedCampaign, setIsUnapprovedCampaign] =
    React.useState<boolean>(false);

  const [isUnapprovedMerchant, setIsUnapprovedMerchant] =
    React.useState<boolean>(false);

  const [isUnapprovedProduct, setIsUnapprovedProduct] =
    React.useState<boolean>(false);

  const [campaignData, setCampaignData] = useState([]);
  const [detonatorData, setDetonatorData] = useState([]);
  const [merchantData, setMerchantdata] = useState([]);
  const [productData, setProductdata] = useState([]);

  const contextValue = {
    isUnapprovedDetonator,
    setIsUnapprovedDetonator,

    isUnapprovedCampaign,
    setIsUnapprovedCampaign,

    isUnapprovedMerchant,
    setIsUnapprovedMerchant,

    isUnapprovedProduct,
    setIsUnapprovedProduct,

    campaignData,
    detonatorData,
    merchantData,
    productData,
  };

  useEffect(() => {
    // Get Campaign
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/campaign/filter", {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        setCampaignData(res.data.body);
        const isRejectedPresent: boolean = res.data.body.some(
          (obj: any) => obj.status === "rejected" || obj.status === "waiting"
        );
        // console.log(isRejectedPresent);
        setIsUnapprovedCampaign(isRejectedPresent);
      })
      .catch((error) => {});
    //----------------------------------------------------------------------------

    // Get Merchant
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ms/v1/merchants", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setMerchantdata(res.data.body);
        // const isRejectedPresent: boolean = res.data.body.some(
        //   (obj: any) => obj.status === "rejected" || obj.status === "waiting"
        // );
        // // console.log(isRejectedPresent);
        // setIsUnapprovedDetonator(isRejectedPresent);
      })
      .catch((error) => {});
    //----------------------------------------------------------------------------

    // Get Merchant
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/merchant/filter", {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        setMerchantdata(res.data.body);
        const isRejectedPresent: boolean = res.data.body.some(
          (obj: any) => obj.status === "rejected" || obj.status === "waiting"
        );
        // console.log(isRejectedPresent);
        setIsUnapprovedMerchant(isRejectedPresent);
      })
      .catch((error) => {});
    //----------------------------------------------------------------------------

    // Get Product
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/ps/v1/products", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setProductdata(res.data.body);
        // const isRejectedPresent: boolean = res.data.body.some(
        //   (obj: any) => obj.status === "rejected" || obj.status === "waiting"
        // );
        // // console.log(isRejectedPresent);
        // setIsUnapprovedProduct(isRejectedPresent);
      })
      .catch((error) => {});
    //----------------------------------------------------------------------------
  }, []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export default AppProvider;
