import { logIn, logOut } from "../reducers/authReducer";
import Cookies from "universal-cookie";
import { logoutUser } from "../../api/login";
const cookies = new Cookies();

export const loginAction = async (
  success,
  dispatch,
  response = null,
  router = null,
  userType = null
) => {
  if (success) {
    login(dispatch, router, response);
  } else {
    logout(dispatch, router, userType);
  }
};

const login = async (dispatch, router, response) => {
  console.log(response);
  cookies.set("auth_token", response.meta, {
    path: "/",
  });
  dispatch(logIn(response.data));
  console.log(response.data);
  if (response.data.role == "admin") {
    router.push("/admin");
  } else {
    router.replace("/user");
  }
};

const logout = async (dispatch, router) => {
  await logoutUser().then(() => {
    cookies.remove("auth_token");
    dispatch(logOut());
    router.replace("/");
  });
};
