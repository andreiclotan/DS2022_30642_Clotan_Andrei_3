import routesManager from "../../components/Routesmanager";
import UserDevices from "../../components/UserDevices";
import UserNavbar from "../../components/UserNavbar";

const Home = () => {
  return (
    <>
      <UserNavbar></UserNavbar>
      <UserDevices></UserDevices>
    </>
  );
};

export default routesManager(Home);
