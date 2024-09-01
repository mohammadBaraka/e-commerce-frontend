import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { handeMessage } from "../Components/SweetAlert/SweetAlert";
import { MAIN_URL } from "../Components/URLS/URLS";
export const ContextApi = createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("users")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${MAIN_URL}/api/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data.data);
    handeMessage("success", res.data.message);
  };

  const logout = async () => {
    try {
      const res = await axios.post(`${MAIN_URL}/api/logout`, null, {
        withCredentials: true,
      });
      setCurrentUser(null);
      handeMessage("success", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <ContextApi.Provider value={{ currentUser, login, logout }}>
      {children}
    </ContextApi.Provider>
  );
};
