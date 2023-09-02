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
import { Feed } from "../Feed/Feed";
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
        {/* homepage */}
        <Route path={defaultPath} element={<HomePage />} />
        {/* ingredients => id */}
        <Route
          path={`${ingredientsPath}/:id`}
          element={<IngredientDetails />}
        />
        {/* feed */}
        <Route path={feedPath} element={<Feed />} />
        {/* feed => modal */}
        <Route path={`${feedPath}/:id`} element={<OrderDetails />} />
        {/* profile page */}
        <Route
          path={profilePath}
          element={
            <ProtectedRoute auth>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* profile page => orders */}
        <Route
          path={`${profilePath}${ordersPath}`}
          element={
            <ProtectedRoute auth>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* profile page => orders => id */}
        <Route
          path={`${profilePath}${ordersPath}/:id`}
          element={
            <ProtectedRoute auth>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        {/* 404 */}
        <Route path="/*" element={<NotFoundPage />} />
        {/* authentication */}
        <Route
          path={loginPath}
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={signinPath}
          element={
            <ProtectedRoute>
              <SignInPage />
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
      </Routes>
      {background && (
        <Routes>
          {/* ingredients => id */}
          <Route
            path={`${ingredientsPath}/:id`}
            element={
              <Modal onClose={onClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
          {/* feed => id */}
          <Route
            path={`${feedPath}/:id`}
            element={
              <Modal onClose={onClose}>
                <OrderDetails isModal />
              </Modal>
            }
          />
          {/* profile page => orders => id */}
          <Route
            path={`${profilePath}${ordersPath}/:id`}
            element={
              <ProtectedRoute auth>
                <Modal onClose={onClose}>
                  <OrderDetails isModal />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
        // todo: to fuck with Outlet a bit more
      )}
    </>
  );
};

export default Router;
