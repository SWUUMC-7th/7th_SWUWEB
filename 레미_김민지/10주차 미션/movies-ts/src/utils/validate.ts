export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 로그인 및 회원가입 유효성 검사
export interface ValidationErrors {
  email?: string;
  password?: string;
}

export function validateLogin(values: { email: string; password: string }): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!emailPattern.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8 ~ 16자 사이로 입력해주세요.";
  }

  return errors;
}
