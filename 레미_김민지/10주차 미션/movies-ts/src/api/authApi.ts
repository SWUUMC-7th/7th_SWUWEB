import { api } from "./axiosInstance";

// 회원가입 요청 타입
export interface RegisterUserData {
  email: string;
  password: string;
  gender: "male" | "female";
  birthDate: string;
}

// 로그인 요청 타입
export interface LoginUserData {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// 회원가입 API 요청 함수
export const registerUser = async (data: RegisterUserData): Promise<void> => {
  return api.post("/auth/register", data);
};

// 로그인 API 요청 함수
export const loginUser = async (credentials: LoginUserData): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// 유저 정보 조회 API 요청 함수
export const getUserInfo = async (): Promise<UserInfo> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token");

  const response = await api.get<UserInfo>("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 유저 정보 타입
export interface UserInfo {
  id: string;
  email: string;
  gender: "male" | "female";
  birthDate: string;
}
