import axios from "axios";

export const fetchDataLogin = async (data) => {
        try{
            const response = await axios.post('http://localhost:3000/auth/login',data
            );
            console.log('로그인 성공');
            localStorage.setItem('refreshToken',response.data.refreshToken);
            localStorage.setItem('accessToken',response.data.accessToken);
        }catch(error){
            console.log('로그인 실패:',error)
        }
    };