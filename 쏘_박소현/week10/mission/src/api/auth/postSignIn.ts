import { AxiosResponse } from "axios";
import { authAxiosInstance } from "..";

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const postSignIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authAxiosInstance.post(
      "/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
