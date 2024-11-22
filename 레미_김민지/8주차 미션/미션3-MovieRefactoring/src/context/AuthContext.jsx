import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [nickname, setNickname] = useState(null);

  const fetchUserInfo = async () => {
    if (accessToken) {
      try {
        const userInfo = await getUserInfo();
        setNickname(userInfo.email.split("@")[0]);
      } catch (error) {
        console.error("Failed to fetch user info.");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [accessToken]);

  const login = async (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    await fetchUserInfo(); // 닉네임 즉시 업데이트
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setNickname(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
