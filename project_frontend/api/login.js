import request from "./request";

export async function logIn(username, password) {
  const body = {
    user: {
      email: username,
      password: password,
    },
  };
  return request({
    url: `users/sign_in`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function sign_up(username, password, confirmation) {
  const body = {
    user: {
      email: username,
      password: password,
      password_confirmation: confirmation,
    },
  };
  return request({
    url: `users`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function logoutUser() {
  return request({
    url: `users/sign_out`,
    method: "DELETE",
  }).then((response) => {
    return response;
  });
}
