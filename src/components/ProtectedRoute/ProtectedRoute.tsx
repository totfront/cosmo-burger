import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactNode } from "react";
import { defaultPath, loginPath } from "../../shared/paths";
import { useSelector } from "../../shared/hooks";

type Props = {
  auth?: boolean;
  children?: ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ auth, children = null }) => {
  const location = useLocation();
  const { isAuthorized } = useSelector((store) => store.user);
  if (!auth && isAuthorized) {
    const {
      from: { pathname },
    } = location.state || { from: { pathname: defaultPath } };
    return <Navigate to={`${pathname}`} replace />;
  }

  if (auth && !isAuthorized) {
    return <Navigate to={`${loginPath}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
