import axios from "axios";

const postSignup = async({data}) => {
    const response = await axios.post('http://localhost:3000/auth/register',data);
    console.log('response.data',response.data)
    return response.data;
}
export default postSignup