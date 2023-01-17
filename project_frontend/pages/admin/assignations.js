import AdminNavbar from "../../components/AdminNavbar";
import Assignations from "../../components/Assignations";
import routesManager from "../../components/Routesmanager";
import ShowUsers from "../../components/ShowUsers";

const Home = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <Assignations></Assignations>
    </>
  );
};

export default routesManager(Home);
