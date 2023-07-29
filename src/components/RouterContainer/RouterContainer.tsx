import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
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
  ingredientsPath,
  ordersPath,
} from "../../shared/paths";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";

const RoutesContainer = () => {
  const {
    selectedIngredient: { _id },
  } = useSelector((store: State) => store.ingredientModal);
  return (
    <Routes>
      <Route path={ordersPath} element={<HomePage />} />
      <Route path={`${ingredientsPath}/${_id}`} element={<HomePage />} />
      <Route path={defaultPath} element={<HomePage />} />
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
