import request from "./request";

export async function sendMessage(userID, message, sender_id) {
  const body = {
    user_id: userID,
    message: message,
    sender_id: sender_id,
  };

  return request({
    url: `messages`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function getMessages(userID) {
  return request({
    url: `messages/${userID}`,
    method: "GET",
  }).then((response) => {
    return response;
  });
}

export async function sendSeen(room_id, user_id) {
  const body = {
    user_id: room_id,
    seen_by: user_id,
  };
  return request({
    url: `messages/seen`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}

export async function sendTyping(user_id, text) {
  const body = {
    typing: user_id,
    text: text,
  };
  console.log(text == "");
  return request({
    url: `messages/typing`,
    method: "POST",
    data: body,
  }).then((response) => {
    return response;
  });
}
