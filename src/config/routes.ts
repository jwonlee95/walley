import { LandingPage } from "pages/landing";
import IRoute from "interfaces/route";
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ResetPasswordPage,
  HomePage,
} from "pages";

const routes: IRoute[] = [
  {
    path: "/home",
    exact: true,
    component: HomePage,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
    name: "Register Page",
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
    name: "Login Page",
    protected: false,
  },
  {
    path: "/change",
    exact: true,
    component: ChangePasswordPage,
    name: "Change Password Page",
    protected: true,
  },
  {
    path: "/logout",
    exact: true,
    component: LogoutPage,
    name: "Logout Page",
    protected: true,
  },
  {
    path: "/forget",
    exact: true,
    component: ForgotPasswordPage,
    name: "Forgot Password Page",
    protected: false,
  },
  {
    path: "/reset",
    exact: true,
    component: ResetPasswordPage,
    name: "Reset Password Page",
    protected: false,
  },
  {
    path: "/walley",
    exact: true,
    component: LandingPage,
    name: "Landing Page",
    protected: false,
  },
];

export default routes;
