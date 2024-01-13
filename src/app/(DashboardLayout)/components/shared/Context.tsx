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
  setUsersdata: any;
  usersData: any;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usersData, setUsersdata] = useState([]);

  const contextValue = {
    setUsersdata,
    usersData,
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE + "/as/v1/users", {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setUsersdata(res.data.body.rows);
      })
      .catch((error) => {});
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
