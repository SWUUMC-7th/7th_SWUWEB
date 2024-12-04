import { authAxiosInstance } from "..";

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export const postSignUp = async (data: SignUpData) => {
  try {
    const response = await authAxiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};
