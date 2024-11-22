import { authAxiosInstance } from "..";

export const getMe = async () => {
  try {
    const response = await authAxiosInstance.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("요청 실패:", error);
    throw error;
  }
};
