import styled from "styled-components";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    display: flex;
    justify-content: center; 
    align-items: center;  
    height:calc(100vh - 60px);
    border-radius: 1px solid blue;
`;
const SignupBox=styled.div` 
    width: 500px;
    height:700px;
    text-align:center;
`;
const Title=styled.div`
    font-size:25px;
    font-weight:700;
    color:white;
    margin-bottom:20px;
`;
const Input=styled.input`
    width:400px;
    height:35px;
    border-color:${(props)=>props.error ? 'red' : 'black'};
    border-radius:10px;
    margin-bottom:10px;
`;
const SignupBtn=styled.button`
    width:410px;
    height:45px;
    background-color:${(props)=>props.disabled ? 'gray' : '#F2075D'};
    color:white;
`;
const Error=styled.div`
    color:red;
    font-size:15px;
    text-align:left;
    margin-left:50px;
    margin-top:-5px;
    margin-bottom:15px;
`;
const GenderBirth=styled.div`
    margin: 0 auto;
    display:flex;
    justify-content:space-between;
    color:#F2075D;
    width:410px;
    height:45px;
    margin-top:-10px;
    margin-bottom:10px; 
    line-height:45px;
    div{
        margin-left:5px;
        margin-right:10px;}
`;
const Gender=styled.div`
    display:flex;
    width:300px;
    >label{color:white !important ;}
`
const Birth=styled.div`
    display:flex;
    width:300px;
    >input{width:100px !important ;}
`;
const SignUpPage = () => {
    const schema = yup.object().shape({
        // name:yup.string().required('이름을 입력해주세요.'),
        email:yup.string().email('유효한 이메일이 아닙니다.').required('이메일을 입력해주세요.'),
        password:yup.string().min(8,'비밀번호는 8자 이상이어야 합니다.').max(16,'비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
        passwordCheck: yup.string()
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 확인은 필수입니다.')
    })
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver:yupResolver(schema),
        mode: 'onChange' 
    });
    const navigate =useNavigate();
    const onSubmit = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/auth/register",data);
            console.log('회원가입 성공',response.data);
            navigate('/login');
        }catch(error){
            console.log('회원가입 실패!',error);
        }
    };

    return (
        <Container>
            <SignupBox>
                <Title>회원가입</Title>
                <form  onSubmit={handleSubmit(onSubmit)}> 
                    {/* <Input 
                        placeholder="이름을 입력해주세요" 
                        error={errors.name}
                        {...register("name")}
                    />
                    <Error>{errors.name?.message}</Error> */}
                    <GenderBirth>
                        <Gender>
                            <div>성별</div>
                            <label>
                                <input type="radio" label="gender" value="male"/>남
                            </label>
                            <label>
                            <input type="radio" label="gender" value="female"/>여
                            </label>
                        </Gender>
                        <Birth>
                            <div>생년월일</div>
                            <Input type="date"/>
                        </Birth>
                    </GenderBirth>
                    <Input 
                        placeholder="이메일을 입력해주세요" 
                        error={errors.email}
                        {...register("email")}
                    />
                    <Error>{errors.email?.message}</Error>
                    <Input 
                        type="password"
                        placeholder="비밀번호를 입력해주세요" 
                        error={errors.password}
                        {...register("password")}
                    />
                    <Error>{errors.password?.message}</Error>
                    <Input 
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        error={errors.passwordCheck}
                        {...register("passwordCheck")}
                    /> 
                    <Error>{errors.passwordCheck?.message}</Error>
                    <SignupBtn 
                        type="submit"
                        disabled={!isValid}
                    >
                        제출
                    </SignupBtn>
                </form>
            </SignupBox>
        </Container>
    );
};

export default SignUpPage;