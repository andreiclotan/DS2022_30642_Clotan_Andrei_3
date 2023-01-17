import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteDevice, getDevices } from "../api/devices";
import styles from "../styles/ChatPage.module.css";
import pencil from "../public/pencil.svg";
import trash from "../public/trash.svg";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { homePage } from "../api/users";
import {
  getMessages,
  sendMessage,
  sendSeen,
  sendTyping,
} from "../api/messages";
import { useSelector } from "react-redux";

const ChatPage = ({ chatId }) => {
  const ws = useMemo(() => new WebSocket("ws://localhost:3000/cable"), []);

  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const [allMessages, setAllMessages] = useState(null);
  const userType = useSelector((state) => state.auth.userType);
  const [reload, setReload] = useState(true);
  const [seen, setSeen] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    var id_test = { channel: "MessageChannel" };
    var stream_id = {
      command: "subscribe",
      identifier: JSON.stringify(id_test),
      data: JSON.stringify({ action: "subscribe", content: "Hi everyone !" }),
    };
    ws.onopen = (event) => {
      ws.send(JSON.stringify(stream_id));
    };
  }, [ws]);

  const send = () => {
    setSeen(false);
    sendTyping(userId, "");
    sendMessage(userType == "admin" ? chatId : userId, message, userId).then(
      (response) => {
        setMessage("");
      }
    );
  };

  useEffect(() => {
    reload
      ? getMessages(userType == "admin" ? chatId : userId).then((response) => {
          setAllMessages(response);
          setReload(false);
          response[response.length - 1].is_seen ? setSeen(true) : null;
        })
      : null;
  }, [reload, userId, userType, chatId]);

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if (json.message == "Message received") {
        setReload(true);
      }

      let json_seen = JSON.parse(json.message);
      if (json_seen?.message == "Seen") {
        json_seen.seen_by != userId ? setSeen(true) : null;
      }
      if (json_seen?.message == "Typing") {
        json_seen.typing != userId ? setTyping(true) : null;
      }
      if (json_seen?.message == "Stopped") {
        json_seen.typing != userId ? setTyping(false) : null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.input}>
      <div className={styles.text_container}>
        {allMessages?.map((item, key) => (
          <div
            key={key}
            className={
              item.sender_id == userId
                ? styles.user_message
                : styles.other_message
            }
          >
            {item.message}
          </div>
        ))}
        <div className={styles.seen}>
          {seen && allMessages[allMessages.length - 1]?.sender_id == userId ? (
            <p>Seen</p>
          ) : null}
          {typing ? <p>Typing...</p> : null}
        </div>
      </div>

      <div className={styles.input_container}>
        <input
          value={message}
          onChange={({ target }) => {
            sendTyping(userId, target.value);
            setMessage(target.value);
          }}
          onFocus={() => {
            sendSeen(userType == "admin" ? chatId : userId, userId);
          }}
        />
        <button onClick={() => send()}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
