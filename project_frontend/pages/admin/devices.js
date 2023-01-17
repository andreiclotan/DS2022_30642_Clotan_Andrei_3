import AdminDevices from "../../components/AdminDevices";
import AdminNavbar from "../../components/AdminNavbar";
import UserDevices from "../../components/UserDevices";
import routesManager from "../../components/Routesmanager";

const Home = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <AdminDevices></AdminDevices>
    </>
  );
};

export default routesManager(Home);
