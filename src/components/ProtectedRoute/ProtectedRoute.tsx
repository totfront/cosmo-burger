import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { defaultPath, loginPath } from "../../shared/paths";

type Props = {
  auth?: boolean;
  children?: ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ auth, children = null }) => {
  const location = useLocation();
  const { isAuthorized } = useSelector((store: State) => store.user);
  if (!auth && isAuthorized) {
    const { from } = location.state || { from: { pathname: defaultPath } };
    return <Navigate to={from.pathname} replace />;
  }

  if (auth && !isAuthorized) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
