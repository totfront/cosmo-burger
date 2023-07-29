import { Route, Routes } from "react-router-dom";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import SignInPage from "../../pages/SignUnPage";
import {
  defaultPath,
  signinPath,
  loginPath,
  forgotPasswordPath,
  resetPasswordPath,
  profilePath,
} from "../../shared/paths";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path={defaultPath} element={<ConstructorPage />} />
      <Route
        path={signinPath}
        element={
          <ProtectedRoute>
            <SignInPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={loginPath}
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={forgotPasswordPath}
        element={
          <ProtectedRoute>
            <ForgotPasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={resetPasswordPath}
        element={
          <ProtectedRoute>
            <ResetPasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={profilePath}
        element={
          <ProtectedRoute auth>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default RoutesContainer;
