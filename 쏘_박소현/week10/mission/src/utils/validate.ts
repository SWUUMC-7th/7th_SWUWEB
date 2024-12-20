interface UserValues {
  email: string;
  password: string;
}

interface ValidationErrors {
  email: string;
  password: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUser(values: UserValues): ValidationErrors {
  const errors: ValidationErrors = {
    email: "",
    password: "",
  };

  if (!emailPattern.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다. 다시 확인해주세요.";
  }

  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8~16자리 사이로 입력해주세요.";
  }

  return errors;
}

function validateLogin(values: UserValues): ValidationErrors {
  return validateUser(values);
}

export { validateLogin };
