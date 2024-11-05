import { postSignUp } from '../api/auth/postSignUp';
import { postSignIn } from '../api/auth/postSignIn';

const useAuth = () => {


  const handleSignUp = async (data) => {
    try {
      const response = await postSignUp(data);
      console.log('회원가입 성공:', response);
      return response;
    } catch (err) {
      console.error('회원가입 요청 실패:', err);
    } 
  };

  const handleSignIn = async (data) => {
    try {
      const response = await postSignIn(data);
      console.log('로그인 성공:', response);
      return response;
    } catch (err) {
      console.error('로그인 요청 실패:', err);
    }
  };
  
  return {
    handleSignUp,
    handleSignIn,
  };
};

export default useAuth;
