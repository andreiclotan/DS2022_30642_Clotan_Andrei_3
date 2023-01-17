import styles from "../styles/Modal.module.css";
import reactDom from "react-dom";
import { useEffect, useState } from "react";
import { addDevice, editDevice, getDeviceReadings } from "../api/devices";
import { useSelector } from "react-redux";

const ReadingsModal = ({ location, max_con, itemId, setModal }) => {
  const [readings, setReadings] = useState(null);
  useEffect(() => {
    getDeviceReadings(itemId).then((response) => {
      setReadings(response);
    });
  }, []);
  const modal = (
    <div className={`${styles.wrapper} modal`}>
      <div className={styles.modal}>
        <div className={styles.header1}>
          <h3>{`Device Location: ${location}`}</h3>
          <h3>{`Max con: ${max_con}`}</h3>
        </div>
        <div className={styles.white_container1}>
          <div className={styles.title_container}>
            <p>Date</p>
            <p>Value</p>
          </div>
          <div className={styles.items1}>
            {readings?.map((item, key) => {
              return (
                <div key={key} className={styles.smtg}>
                  <p>{item.date}</p>
                  <p
                    className={item.value > max_con ? styles.red : styles.green}
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer1}>
          <button onClick={() => setModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
  return reactDom.createPortal(modal, document.body);
};

export default ReadingsModal;
