import { createContext,  useState, useEffect, useCallback  } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 
const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [nickname, setNickname] = useState(null);

  
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

    const setLogin = async (token) => {
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
    
    LoginContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };

    export default LoginContext;