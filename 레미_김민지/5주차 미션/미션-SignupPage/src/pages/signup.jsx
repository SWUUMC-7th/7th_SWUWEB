import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email("유효한 이메일 형식이 아닙니다.").required("이메일을 입력 해주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상 입력 해주세요.")
    .max(16, "비밀번호는 16자 이하 입력 해주세요.")
    .required("비밀번호를 입력 해주세요."),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 다시 확인해주세요."),
  gender: yup.string().required("성별을 선택 해주세요."),
  birthDate: yup.date().required("생년월일을 입력 해주세요."),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("회원가입 데이터:", data);
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "102%",
            }}
          >
            <InputWrapper>
              <LabelTitle>성별</LabelTitle>
              <GenderWrapper>
                <Label>
                  <input type="radio" value="male" {...register("gender")} />
                  남성
                </Label>
                <Label>
                  <input type="radio" value="female" {...register("gender")} />
                  여성
                </Label>
              </GenderWrapper>
              {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
            </InputWrapper>
            <InputWrapper>
              <LabelTitle>생년월일</LabelTitle>
              <InputBox
                type="date"
                placeholder="생년월일을 입력해주세요!"
                {...register("birthDate")}
                style={{ width: "50%" }}
              />
              {errors.birthDate && <ErrorMessage>{errors.birthDate.message}</ErrorMessage>}
            </InputWrapper>
          </div>
          <InputWrapper>
            <InputBox type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <InputBox
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              {...register("password")}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <InputBox
              type="password"
              placeholder="비밀번호를 다시 입력해주세요!"
              {...register("passwordCheck")}
            />
            {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}
          </InputWrapper>
          <Button type="submit" disabled={!isValid}>
            가입하기
          </Button>
        </Form>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 28px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 28px;
  position: relative;
`;

const InputBox = styled.input`
  all: unset;
  width: 100%;
  height: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  font-size: 14px;
  color: black;
  border: 1px solid #ddd;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff213b;
  }
`;

const LabelTitle = styled.h1`
  margin-right: 12px;
  font-weight: bold;
  font-size: 18px;
  color: #ff213b;
`;

const GenderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Label = styled.label`
  margin-right: 15px;
`;

const ErrorMessage = styled.span`
  align-items: center;
  color: #ff213b;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 12px;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  padding: 12px 0;
  border-radius: 12px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b")};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    color: ${(props) => (props.disabled ? "#fff" : "#ffffffa6")};
    background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b8b")};
  }
`;

export default Signup;
