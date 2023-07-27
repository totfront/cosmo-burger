import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, FC, ReactNode } from "react";
import { getUserData } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { defaultPath, loginPath } from "../../shared/paths";
// import { defaultPath } from "../../shared/paths";

type Props = {
  isUserAuthorized?: boolean;
  children?: ReactNode;
};

// todo: split the spaces for two types of users
export const ProtectedRoute: FC<Props> = ({
  isUserAuthorized = false,
  children,
}): any => {
  const isAuthChecked = true;
  const navigate = useNavigate();
  const { email } = useSelector((store: Store) => store.user);

  //   const navigate = useNavigate();

  const location = useLocation();

  if (!isAuthChecked) return <>⏳ Loading... </>;

  //   const dispatch: any = useDispatch();

  //   useEffect(() => {
  //     dispatch(getUserData());
  //   }, [dispatch]);

  console.log({ isUserAuthorized, email, location });
  if (isUserAuthorized && email) {
    const { from } = location.state || { from: { pathname: defaultPath } };
    return <Navigate to={from} replace />;
  }

  if (!isUserAuthorized && !email) {
    // navigate(loginPath);
    return <Navigate to={loginPath} state={{ from: location }} />;
  }

  return children;
};
