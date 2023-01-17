import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteDevice, getAdminDevices, getDevices } from "../api/devices";
import styles from "../styles/UserDevices.module.css";
import pencil from "../public/pencil.svg";
import trash from "../public/trash.svg";
import Modal from "./Modal";

const AdminDevices = () => {
  const [devices, setDevices] = useState([]);
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [max, setMax] = useState("");
  useEffect(() => {
    reload ? getAdminDevices().then((response) => setDevices(response)) : null;
    setReload(false);
  }, [reload]);
  const handleEdit = (item) => {
    setLocation(item.location);
    setDescription(item.description);
    setMax(item.maximum_consumption);
    setModal(true);
    setIsEdit(true);
    setItemId(item.id);
  };

  const handleAdd = () => {
    setLocation("");
    setDescription("");
    setMax("");
    setModal(true);
    setIsEdit(false);
    setItemId(0);
  };

  const handleDelete = (item) => {
    deleteDevice(item.id).then(() => setReload(true));
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <button className={styles.button} onClick={handleAdd}>
          Add device
        </button>
      </div>
      <div className={styles.tag_container}>
        <span>Location</span>
        <span>UserAssigned</span>
        <span>Maximum consumption</span>
        <span>Actions</span>
      </div>
      {devices?.map((item, key) => {
        return (
          <div key={key} className={styles.item}>
            <span>{item.location}</span>
            <span>{item.user_id}</span>
            <span>{item.maximum_consumption}</span>
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
        <Modal
          setModal={setModal}
          setReload={setReload}
          locationState={location}
          maximum_consumptionState={max}
          descriptionState={description}
          isEdit={isEdit}
          itemId={itemId}
        ></Modal>
      ) : null}
    </div>
  );
};

export default AdminDevices;
