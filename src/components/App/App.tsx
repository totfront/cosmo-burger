import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../../pages/SignUnPage";
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path={defaultPath} element={<ConstructorPage />} />
          <Route path={signinPath} element={<SignInPage />} />
          <Route
            path={loginPath}
            element={
              <ProtectedRoute isUserAuthorized>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route path={forgotPasswordPath} element={<ForgotPasswordPage />} />
          <Route path={resetPasswordPath} element={<ResetPasswordPage />} />
          <Route
            path={profilePath}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
