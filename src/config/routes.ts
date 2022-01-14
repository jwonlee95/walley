import IRoute from "interfaces/route";
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ResetPasswordPage,
  HomePage,
  AccountPage,
  LandingPage,
  AboutPage,
  AddExpensePage,
  AddIncomePage,
  AddSubscriptionPage,
  ExpenseCategoryPage,
  IncomeCategoryPage,
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
    path: "/",
    exact: true,
    component: LandingPage,
    name: "Production Landing Page",
    protected: false,
  },
  {
    path: "/walley",
    exact: true,
    component: LandingPage,
    name: "Landing Page",
    protected: false,
  },
  {
    path: "/account",
    exact: true,
    component: AccountPage,
    name: "Account Page",
    protected: false,
  },
  {
    path: "/about",
    exact: true,
    component: AboutPage,
    name: "About Page",
    protected: false,
  },
  {
    path: "/expense",
    exact: true,
    component: AddExpensePage,
    name: "Add Expense Page",
    protected: false,
  },
  {
    path: "/income",
    exact: true,
    component: AddIncomePage,
    name: "Add Income Page",
    protected: false,
  },
  {
    path: "/subscription",
    exact: true,
    component: AddSubscriptionPage,
    name: "Add Subscription Page",
    protected: false,
  },
  {
    path: "/excategory",
    exact: true,
    component: ExpenseCategoryPage,
    name: "Add Category Page",
    protected: false,
  },
  {
    path: "/incategory",
    exact: true,
    component: IncomeCategoryPage,
    name: "Add Category Page",
    protected: false,
  },
];

export default routes;
