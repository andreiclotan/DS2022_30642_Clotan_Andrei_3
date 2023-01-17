import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export default function routesManager(WrappedComponent) {
  const Component = (props) => {
    const router = useRouter();
    const isAuth = useSelector((state) => state.auth.isLoggedIn);
    const userType = useSelector((state) => state.auth.userType);
    if (!isAuth && router.pathname != "/" && router.pathname != "/sign_up") {
      router.push("/");
      return null;
    }

    if (userType == "admin" && !/admin/.test(router.pathname)) {
      router.push("/admin");
      return null;
    }
    if (userType == "admin" && router.pathname == "/") {
      router.push("/admin");
      return null;
    }
    if (userType == "user" && router.pathname == "/") {
      router.push("/user");
      return null;
    }
    if (userType == "user" && !/user/.test(router.pathname)) {
      router.push("/user");
      return null;
    }

    return isAuth ? (
      <WrappedComponent {...props} />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return Component;
}
