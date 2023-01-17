import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { deleteDevice, getDevices } from "../api/devices";
import styles from "../styles/UserDevices.module.css";
import pencil from "../public/pencil.svg";
import trash from "../public/trash.svg";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { homePage } from "../api/users";

const UserPage = () => {
  const ws = useMemo(() => new WebSocket("ws://localhost:3000/cable"), []);
  const [count, setCount] = useState(0);
  useEffect(() => {
    homePage();
    var id_test = { channel: "AlertsChannel" };
    var stream_id = {
      command: "subscribe",
      identifier: JSON.stringify(id_test),
      data: JSON.stringify({ action: "subscribe", content: "Hi everyone !" }),
    };
    ws.onopen = (event) => {
      ws.send(JSON.stringify(stream_id));
    };
  }, [ws]);

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if (json.message == "Overflow") {
        toast.warn(
          "One of your devices has exceded the maximum consumption limit"
        );
      }
      if (json.message == "Close") {
        ws.close();
      }
    } catch (err) {
      console.log(err);
    }
  };
  //map the first 5 bids

  return <ToastContainer />;
};

export default UserPage;
