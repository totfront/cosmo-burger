import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../../pages/SignInPage";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import AppHeader from "../AppHeader/AppHeader";
import LoginPage from "../../pages/LoginPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import {
  defaultPath,
  forgotPasswordPath,
  loginPath,
  profilePath,
  resetPasswordPath,
  signinPath,
} from "../../shared/paths";
import ProfilePage from "../../pages/ProfilePage";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path={defaultPath} element={<ConstructorPage />} />
          <Route path={signinPath} element={<SignInPage />} />
          <Route path={loginPath} element={<LoginPage />} />
          <Route path={forgotPasswordPath} element={<ForgotPasswordPage />} />
          <Route path={resetPasswordPath} element={<ResetPasswordPage />} />
          <Route path={profilePath} element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
