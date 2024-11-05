import authAxiosInstance from '..';

export const postSignIn = async (data) => {
  try {
    const response = await authAxiosInstance.post('/login', data);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};