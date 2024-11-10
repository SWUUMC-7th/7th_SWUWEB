import { useContext } from "react";
import LoginContext from "../content/loginContext";

const useIsLogin = () => useContext(LoginContext);

export default useIsLogin;