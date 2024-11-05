import { authAxiosInstance } from "..";

export const postSignUp = async (data) => {
  try {
    const response = await authAxiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};
