const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
const namePattern = /^[가-힣]+$/;
function validateUser(values){
    const errors={
        name:'',
        birth:'',
        email:'',
        password:'',
        passwordCheck:'',
    }
    if(namePattern.test(values.name)===false){
        errors.name="이름은 한글로 입력해야합니다.";
    }
    if(values.birth && values.birth.length != 8){
        errors.birth="생년월일은 8자리로 입력해주세요.";
    }
    if(emailPattern.test(values.email)===false){
        errors.email="올바른 이메일 형식이 아닙니다.";
    }
    if(values.password.length < 8 || values.password.length > 16){
        errors.password="비밀번호는 8~16자 이내로 입력해주세요.";
    }
    if(values.passwordCheck!==values.password){
        errors.passwordCheck="비밀번호가 일치하지 않습니다.";
    }
    return errors;
}
function validateLogin(values){
    return validateUser(values);
}
function validateSignup(values){
    return validateUser(values);
}
export {validateLogin,validateSignup}