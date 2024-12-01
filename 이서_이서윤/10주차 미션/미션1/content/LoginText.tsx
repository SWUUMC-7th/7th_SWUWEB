import { createContext,  useState, useEffect, useCallback,ReactNode  } from "react";
import axios from "axios";

interface LoginContextType {
    accessToken: string | null;
    nickname: string | null;
    setLogin: (token: string) => void;
    setLogout: () => void;
  }

  const LoginContext = createContext<LoginContextType>({
    accessToken: null,
    nickname: null,
    setLogin: () => {},
    setLogout: () => {},
  });

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [nickname, setNickname] = useState<string | null>(null);

  
  const fetchUserInfo = useCallback( async () => {
    if(accessToken){
        try {
            const response = await axios.get('http://localhost:3000/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            setNickname((response.data.email).split('@')[0]);
        } catch (error) {
            console.log('사용자 정보 얻기 실패:', error);
        }
    }
    },[accessToken]);

    useEffect(()=>{
        fetchUserInfo();
    },[ fetchUserInfo])

    const setLogin = async (token:string) => {
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        fetchUserInfo(); 
      };
    
    const setLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setNickname(null);
    };

    return (
        <LoginContext.Provider value={{ accessToken, nickname, setLogin, setLogout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;