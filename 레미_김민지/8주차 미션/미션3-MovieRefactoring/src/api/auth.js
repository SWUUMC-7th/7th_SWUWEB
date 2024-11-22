import { useMutation } from "@tanstack/react-query";
import { api } from "./axios-instance";

// 회원가입 API 요청 함수
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// 로그인 API 요청 함수
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// 회원가입 Hook
export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error.response?.data || error.message);
    },
  });
};

// 로그인 Hook
export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      localStorage.setItem("accessToken", data.accessToken); // 토큰 저장
    },
    onError: (error) => {
      console.error("로그인 실패:", error.response?.data || error.message);
    },
  });
};

// 유저 정보 조회 API 요청 함수
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
