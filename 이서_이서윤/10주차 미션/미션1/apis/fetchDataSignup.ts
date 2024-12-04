import axios from "axios";

interface SignupData {
    email: string;
    password: string;
    passwordCheck: string;
}
interface Data{
    data:SignupData
}
const postSignup = async(data:Data) => {
    console.log(data.data)
    const response = await axios.post('http://localhost:3000/auth/register',data.data);
    console.log('response.data',response.data)
    return response.data;
}
export default postSignup