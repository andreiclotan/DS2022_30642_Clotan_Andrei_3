import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteDevice, getDevices } from "../api/devices";
import styles from "../styles/UserDevices.module.css";
import pencil from "../public/pencil.svg";
import trash from "../public/trash.svg";
import Modal from "./Modal";
import { deleteUser, getUsers } from "../api/users";
import UserModal from "./UserModal";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    reload ? getUsers().then((response) => setUsers(response)) : null;
    setReload(false);
  }, [reload]);
  const handleEdit = (item) => {
    setEmail(item.email);
    setName(item.name);
    setRole(item.role);
    setModal(true);
    setIsEdit(true);
    setItemId(item.id);
  };

  const handleAdd = () => {
    setEmail("");
    setName("");
    setRole("");
    setModal(true);
    setIsEdit(false);
    setItemId(0);
  };

  const handleDelete = (item) => {
    deleteUser(item.id).then(() => setReload(true));
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <button className={styles.button} onClick={handleAdd}>
          Add user
        </button>
      </div>
      <div className={styles.tag_container}>
        <span>Email</span>
        <span>Name</span>
        <span>Role</span>
        <span>Actions</span>
      </div>
      {users?.map((item, key) => {
        return (
          <div key={key} className={styles.item}>
            <span>{item.email}</span>
            <span>{item.name}</span>
            <span>{item.role}</span>
            <div className={styles.image_container}>
              <div onClick={() => handleEdit(item)}>
                <Image src={pencil} alt={""} />
              </div>
              <div onClick={() => handleDelete(item)}>
                <Image src={trash} alt={""} />
              </div>
            </div>
          </div>
        );
      })}
      {modal ? (
        <UserModal
          setModal={setModal}
          setReload={setReload}
          emailState={email}
          nameState={name}
          roleState={role}
          isEdit={isEdit}
          itemId={itemId}
        ></UserModal>
      ) : null}
    </div>
  );
};

export default ShowUsers;
