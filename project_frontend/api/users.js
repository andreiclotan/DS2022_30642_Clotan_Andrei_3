import request from "./request";

export async function getUsers() {
  return request({
    url: `user`,
    method: "GET",
  }).then((response) => {
    console.log(response);
    return response;
  });
}

export async function getOnlyUsers() {
  return request({
    url: `user/not_admins`,
    method: "GET",
  }).then((response) => {
    return response;
  });
}

export async function homePage() {
  return request({
    url: `user/home`,
    method: "GET",
  });
}

export async function addUser(email, name, role) {
  const body = {
    email: email,
    name: name,
    role: role,
  };
  return request({
    url: `user`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function editUser(email, name, role, itemId) {
  const body = {
    email: email,
    name: name,
    role: role,
  };
  return request({
    url: `user/${itemId}`,
    method: "PATCH",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function deleteUser(itemId) {
  return request({
    url: `user/${itemId}`,
    method: "DELETE",
  }).then((response) => {
    return response;
  });
}
