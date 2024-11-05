import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-top: 100px;
`;

const GenderContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 404px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.disabled ? "gray" : "#ff3557")};
  color: white;
  padding: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const SignUpPage = () => {
  const [birthdate, setBirthdate] = useState(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일을 입력해주세요.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 반드시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }, 
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", 
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          register={{ ...register("email") }}
          error={errors.email?.message}
          placeholder="이메일을 입력하세요"
        />
        <Input
          label="Password"
          type="password"
          register={{ ...register("password") }}
          error={errors.password?.message}
          placeholder="비밀번호를 입력하세요"
        />
        <Input
          label="Password Check"
          type="password"
          register={{ ...register("passwordCheck") }}
          error={errors.passwordCheck?.message}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <GenderContainer>
          <label>
            <input type="radio" {...register("gender")} value="male" />
            남성
          </label>
          <label>
            <input type="radio" {...register("gender")} value="female" />
            여성
          </label>
        </GenderContainer>

        <Input
          type="date"
          register={{ ...register("birthdate") }}
          error={errors.birthdate?.message}
          onChange={(date) => {
            setValue("birthdate", date);
            setBirthdate(date);
          }}
          placeholder="생년월일을 입력해주세요."
          value={birthdate}
        />

        <Button type="submit" disabled={!isValid}>
          가입하기
        </Button>
      </form>
    </Container>
  );
};

export default SignUpPage;
