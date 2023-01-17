import styles from "../styles/Modal.module.css";
import reactDom from "react-dom";
import { useState } from "react";
import { addDevice, editDevice } from "../api/devices";
import { useSelector } from "react-redux";
import { addUser, editUser } from "../api/users";

const UserModal = ({
  setModal,
  setReload,
  emailState,
  nameState,
  roleState,
  isEdit,
  itemId,
}) => {
  const [email, setEmail] = useState(emailState);
  const [name, setName] = useState(nameState);
  const [role, setRole] = useState(roleState);
  const handleSubmit = () => {
    !isEdit
      ? addUser(email, name, role).then(() => {
          setModal(false);
          setReload(true);
        })
      : editUser(email, name, role, itemId).then(() => {
          setModal(false);
          setReload(true);
        });
  };
  const modal = (
    <div className={`${styles.wrapper} modal`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{isEdit ? "Edit user" : "Add user"}</h3>
        </div>
        <div className={styles.white_container}>
          <div className={styles.line_container}>
            <span>Email:</span>
            <input
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            ></input>
          </div>
          <div className={styles.line_container}>
            <span>Name:</span>
            <input
              value={name}
              onChange={({ target }) => {
                setName(target.value);
              }}
            />
          </div>
          <div className={styles.line_container}>
            <span>Role:</span>
            <select
              value={role}
              onChange={({ target }) => {
                setRole(target.value);
              }}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={() => handleSubmit()}>
            {isEdit ? "Edit" : "Add"}
          </button>
          <button onClick={() => setModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
  return reactDom.createPortal(modal, document.body);
};

export default UserModal;
