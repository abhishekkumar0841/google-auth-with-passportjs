import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRouteChecker = ({element}) => {
  const isLoggedIn = useSelector((state) => state.auth.token);

  if (!isLoggedIn) {
    return element;
  }

  return <Navigate to={"/"} replace />;
};

export default PublicRouteChecker;
