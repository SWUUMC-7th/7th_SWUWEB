import { useContext } from "react";
import LoginContext from "../content/LoginContext";

const useIsLogin = () => useContext(LoginContext);

export default useIsLogin;