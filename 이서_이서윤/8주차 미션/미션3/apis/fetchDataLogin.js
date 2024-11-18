import axios from "axios";

const postLogin = async ({data}) => {
        const response = await axios.post('http://localhost:3000/auth/login',data);
        console.log('로그인 성공');
        localStorage.setItem('refreshToken',response.data.refreshToken);
        localStorage.setItem('accessToken',response.data.accessToken);
    };
export default postLogin