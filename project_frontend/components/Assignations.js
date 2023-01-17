import { useEffect, useState } from "react";
import {
  assignDevice,
  deleteDevice,
  getAdminDevices,
  getDevices,
} from "../api/devices";
import styles from "../styles/UserDevices.module.css";
import Async, { useAsync } from "react-select/async";

import { getUsers } from "../api/users";
import { useRouter } from "next/router";

const UserDevices = () => {
  let userId;
  let deviceId;
  const router = useRouter();
  const loadOptions = async () => {
    return getUsers().then((response) => {
      const deviceOptions = response.map((item) => {
        return { value: item.id, label: item.email };
      });

      return deviceOptions;
    });
  };

  const loadDevices = async () => {
    return getAdminDevices().then((response) => {
      const deviceOptions = response.map((item) => {
        return { value: item.id, label: item.location };
      });

      return deviceOptions;
    });
  };

  const handleAdd = () => {
    userId && deviceId
      ? assignDevice(userId, deviceId).then(() => router.push("/admin/devices"))
      : null;
  };

  const handleDelete = (item) => {
    deleteDevice(item.id).then(() => setReload(true));
  };

  const CustomStyle = {
    menu: (base) => ({ ...base, marginLeft: "4px" }),
    option: (base) => ({ ...base, color: "black" }),
  };

  return (
    <div className={styles.container}>
      <span>User:</span>
      <Async
        loadOptions={loadOptions}
        cacheOptions
        defaultOptions
        styles={CustomStyle}
        onChange={(newValue) => (userId = newValue.value)}
      ></Async>
      <span>Device:</span>
      <Async
        loadOptions={loadDevices}
        cacheOptions
        defaultOptions
        styles={CustomStyle}
        onChange={(newValue) => (deviceId = newValue.value)}
      ></Async>
      <div className={styles.right_bottom}>
        <button className={styles.button} onClick={handleAdd}>
          Assign device
        </button>
      </div>
    </div>
  );
};

export default UserDevices;
