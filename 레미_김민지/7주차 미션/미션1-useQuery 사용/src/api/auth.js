import { api } from "./axios-instance.js";

// 회원가입 API 요청 함수
export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data);
    throw error;
  }
};

// 로그인 API 요청 함수
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data);
    throw error;
  }
};

export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token");

  try {
    const response = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error.response?.data);
    throw error;
  }
};
