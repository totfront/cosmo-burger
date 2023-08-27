import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
  feedPath,
} from "../../shared/paths";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { useEffect, useState } from "react";
import { getIdFromPath } from "../../services/helpers";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Orders } from "../Orders/Orders";
import { OrderDetails } from "../OrderDetails/OrderDetails";

const Router = () => {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname, state } = location;
  const background = state && state.background;

  const { _id } = useSelector(
    (state: State) =>
      state.ingredientModal.selectedIngredient || {
        _id: getIdFromPath(pathname),
      }
  );

  const onClose = () => navigate(-1);

  useEffect(() => {
    setId(_id);
    if (pathname.includes(`${ingredientsPath}/`)) {
      setId(getIdFromPath(pathname));
    }
  }, [_id, id, pathname, dispatch]);
  return (
    <>
      <Routes location={background || location}>
        <Route path={defaultPath} element={<HomePage />} />
        <Route path={feedPath} element={<Orders />} />
        <Route path={`${feedPath}/:id`} element={<OrderDetails />} />
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
        <Route
          path={`${profilePath}${ordersPath}`}
          element={
            <ProtectedRoute auth>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${profilePath}${ordersPath}/:id`}
          element={
            <ProtectedRoute auth>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={`${ingredientsPath}/:id`}
            element={
              <Modal onClose={onClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default Router;
