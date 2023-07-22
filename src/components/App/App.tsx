import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../../pages/SignInPage/SignInPage";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import AppHeader from "../AppHeader/AppHeader";
import LoginPage from "../../pages/SignInPage/LoginPage";
import ForgotPasswordPage from "../../pages/SignInPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/SignInPage/ResetPasswordPage";
import { resetPasswordPath } from "../../shared/paths";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path={resetPasswordPath} element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
