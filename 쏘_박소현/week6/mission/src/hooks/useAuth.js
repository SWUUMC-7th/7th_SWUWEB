import { postSignUp } from "../api/auth/postSignUp";
import { postSignIn } from "../api/auth/postSignIn";
import { getMe } from "../api/auth/getMe";
import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const handleSignUp = async (data) => {
    try {
      const response = await postSignUp(data);
      console.log("회원가입 성공:", response);
      return response;
    } catch (err) {
      console.error("회원가입 요청 실패:", err);
    }
  };

  const handleSignIn = async (data) => {
    try {
      const response = await postSignIn(data);
      console.log("로그인 성공:", response);

      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);

      const userData = await getMe();
      setUser(userData);

      return response;
    } catch (err) {
      console.error("로그인 요청 실패:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return {
    handleSignUp,
    handleSignIn,
    logout,
    user
  };
};

export default useAuth;
