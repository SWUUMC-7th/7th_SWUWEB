import axios from "axios";

export const fetchDataSignUp = async (data) => {
    try{
        const response = await axios.post('http://localhost:3000/auth/register',data
        );
        console.log('회원가입 성공');
        console.log(response.data);
    }catch(error){
        console.log('회원가입 실패:',error)
    }
};