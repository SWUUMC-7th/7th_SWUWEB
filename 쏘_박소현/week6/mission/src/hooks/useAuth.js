import { useState } from 'react';
import { postSignUp } from '../api/auth/postSignUp';
import { postSignIn } from '../api/auth/postSignIn';

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSignUp = async (data) => {
    try {
      const response = await postSignUp(data);
      console.log('회원가입 성공:', response);
      return response;
    } catch (err) {
      console.error('회원가입 요청 실패:', err);
      setError(err.response?.data?.message || '회원가입 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const data = { email, password };
      const response = await postSignIn(data);
      console.log('로그인 성공:', response);
      return response;
    } catch (err) {
      console.error('로그인 요청 실패:', err);
      setError(err.response?.data?.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    error,
    loading,
    handleSignUp,
    handleSignIn,
  };
};

export default useAuth;
