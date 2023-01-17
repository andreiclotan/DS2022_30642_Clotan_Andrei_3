import styles from "../styles/Modal.module.css";
import reactDom from "react-dom";
import { useState } from "react";
import { addDevice, editDevice } from "../api/devices";
import { useSelector } from "react-redux";

const Modal = ({
  setModal,
  setReload,
  locationState,
  maximum_consumptionState,
  descriptionState,
  isEdit,
  itemId,
}) => {
  const [location, setLocation] = useState(locationState);
  const [description, setDescription] = useState(descriptionState);
  const [max, setMax] = useState(maximum_consumptionState);
  const userId = useSelector((state) => state.auth.userId);
  const handleSubmit = () => {
    !isEdit
      ? addDevice(location, description, max, userId).then(() => {
          setModal(false);
          setReload(true);
        })
      : editDevice(location, description, max, itemId).then(() => {
          setModal(false);
          setReload(true);
        });
  };
  const modal = (
    <div className={`${styles.wrapper} modal`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{isEdit ? "Edit device" : "Add device"}</h3>
        </div>
        <div className={styles.white_container}>
          <div className={styles.line_container}>
            <span>Location:</span>
            <input
              value={location}
              onChange={({ target }) => {
                setLocation(target.value);
              }}
            ></input>
          </div>
          <div className={styles.line_container}>
            <span>Description:</span>
            <textarea
              value={description}
              onChange={({ target }) => {
                setDescription(target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.line_container}>
            <span>Max.Con:</span>
            <input
              value={max}
              onChange={({ target }) => {
                setMax(target.value);
              }}
            ></input>
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

export default Modal;
