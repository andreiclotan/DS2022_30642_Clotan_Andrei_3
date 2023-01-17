import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteDevice, getDevices } from "../api/devices";
import styles from "../styles/UserDevices.module.css";
import pencil from "../public/pencil.svg";
import trash from "../public/trash.svg";
import Modal from "./Modal";
import { deleteUser, getOnlyUsers, getUsers } from "../api/users";
import UserModal from "./UserModal";
import { useDispatch } from "react-redux";
import { setChatId } from "../store/reducers/authReducer";
import { useRouter } from "next/router";

const ShowChatUsers = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    reload ? getOnlyUsers().then((response) => setUsers(response)) : null;
    setReload(false);
  }, [reload]);

  const handleRedirect = (id) => {
    dispatch(setChatId(id));
    router.push("/admin/chatsupport");
  };
  return (
    <div className={styles.container}>
      <div className={styles.tag_container}>
        <span>Email</span>
        <span>Actions</span>
      </div>
      {users?.map((item, key) => {
        return (
          <div key={key} className={styles.item}>
            <span>{item.email}</span>
            <div className={styles.image_container}>
              <div>
                <button onClick={() => handleRedirect(item.id)}>Chat!</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowChatUsers;
