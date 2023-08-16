import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import SignInPage from "../../pages/SignUpPage/SignUpPage";
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
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { useEffect, useState } from "react";
import { getIdFromPath } from "../../services/helpers";

const RoutesContainer = () => {
  const [id, setId] = useState("");
  const { pathname } = useLocation();
  const { _id } = useSelector(
    (state: State) =>
      state.ingredientModal.selectedIngredient || {
        _id: getIdFromPath(pathname),
      }
  );

  useEffect(() => {
    setId(_id);
    if (pathname.includes(`${ingredientsPath}/`)) {
      setId(getIdFromPath(pathname));
    }
  }, [_id, id, pathname]);
  return (
    <Routes>
      <Route path={ordersPath} element={<HomePage />} />
      <Route path={`${ingredientsPath}/${id}`} element={<HomePage />} />
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
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesContainer;
