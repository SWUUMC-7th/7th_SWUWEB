import { useContext } from "react";
import LoginContext from "../content/LoginText";

const useIsLogin = () => useContext(LoginContext);

export default useIsLogin;