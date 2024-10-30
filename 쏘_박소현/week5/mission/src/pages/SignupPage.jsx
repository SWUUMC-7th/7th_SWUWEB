import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";

const SignupPage = () => {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        register={{ ...register("email") }}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        register={{ ...register("password") }}
        error={errors.password?.message}
      />
      <Input
        label="Password Check"
        type="password"
        register={{ ...register("passwordCheck") }}
        error={errors.passwordCheck?.message}
      />
      <input type="submit" />
    </form>
  );
};

export default SignupPage;
