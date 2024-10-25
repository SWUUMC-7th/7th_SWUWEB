import styled from "styled-components";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    display: flex;
    justify-content: center; 
    align-items: center;  
    height:calc(100vh - 60px);
    border-radius: 1px solid blue;
`;
const LogInBox=styled.div`
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

const SignUpPage = () => {
    const schema = yup.object().shape({
        email:yup.string().email('유효한 이메일이 아닙니다.').required('이메일을 입력해주세요.'),
        password:yup.string().min(8,'비밀번호는 8자 이상이어야 합니다.').max(16,'비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.')
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:yupResolver(schema)
    });
    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    }
    return (
        <Container>
            <LogInBox>
                <Title>회원가입</Title>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        placeholder="이메일을 입력해주세요" 
                        {...register("email")}
                    />
                    <Error>{errors.email?.message}</Error>
                    <Input 
                        type="password"
                        placeholder="비밀번호를 입력해주세요" 
                        {...register("password")}
                    />
                    <Error>{errors.password?.message}</Error>
                    {/* <Input 
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요" 
                        {...register("password")}
                    /> */}
                    {/* {pwCheck && <Error>{login.errors.password}</Error>} */}
                    <SignupBtn type="submit">제출</SignupBtn>
                </form>
            </LogInBox>
        </Container>
    );
};

export default SignUpPage;