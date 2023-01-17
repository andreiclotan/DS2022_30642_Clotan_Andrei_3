import request from "./request";

export async function getDevices() {
  return request({
    url: `devices`,
    method: "GET",
  }).then((response) => {
    return response;
  });
}

export async function getAdminDevices() {
  return request({
    url: `admin/devices`,
    method: "GET",
  }).then((response) => {
    return response;
  });
}

export async function addDevice(
  location,
  description,
  maximum_consumption,
  userId
) {
  const body = {
    location: location,
    description: description,
    maximum_consumption: maximum_consumption,
    user_id: userId,
  };
  return request({
    url: `devices`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function editDevice(
  location,
  description,
  maximum_consumption,
  itemId
) {
  const body = {
    location: location,
    description: description,
    maximum_consumption: maximum_consumption,
  };
  return request({
    url: `devices/${itemId}`,
    method: "PATCH",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function deleteDevice(itemId) {
  return request({
    url: `devices/${itemId}`,
    method: "DELETE",
  }).then((response) => {
    return response;
  });
}

export async function getDeviceReadings(itemId) {
  return request({
    url: `devices/${itemId}/readings`,
    method: "GET",
  }).then((response) => {
    return response;
  });
}

export async function assignDevice(userID, deviceID) {
  const body = {
    user_id: userID,
    device_id: deviceID,
  };

  return request({
    url: `devices/assign`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}
