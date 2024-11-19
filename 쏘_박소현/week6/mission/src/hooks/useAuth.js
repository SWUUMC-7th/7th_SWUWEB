import { useMutation, useQuery, useQueryClient } from "react-query";
import { postSignUp } from "../api/auth/postSignUp";
import { postSignIn } from "../api/auth/postSignIn";
import { getMe } from "../api/auth/getMe";
import { useState } from "react";

const useAuth = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);

  const signUpMutation = useMutation(postSignUp, {
    onSuccess: (response) => {
      console.log("회원가입 성공:", response);
    },
    onError: (error) => {
      console.error("회원가입 요청 실패:", error);
    },
  });

  const signInMutation = useMutation(postSignIn, {
    onSuccess: async (response) => {
      console.log("로그인 성공:", response);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);

      const userData = await queryClient.fetchQuery("user", getMe);
      setUser(userData);
    },
    onError: (error) => {
      console.error("로그인 요청 실패:", error);
    },
  });

  useQuery("user", getMe, {
    onSuccess: (data) => setUser(data),
    onError: (error) => console.error("사용자 정보 가져오기 실패:", error),
    enabled: !!localStorage.getItem("accessToken"),
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    queryClient.removeQueries("user");
  };

  return {
    handleSignUp: signUpMutation.mutate,
    handleSignIn: signInMutation.mutate,
    logout,
    user,
    signUpStatus: {
      isLoading: signUpMutation.isLoading,
      isError: signUpMutation.isError,
      isSuccess: signUpMutation.isSuccess,
    },
    signInStatus: {
      isLoading: signInMutation.isLoading,
      isError: signInMutation.isError,
      isSuccess: signInMutation.isSuccess,
    },
  };
};

export default useAuth;
