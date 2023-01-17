import AdminNavbar from "../../components/AdminNavbar";
import ShowUsers from "../../components/ShowUsers";
import routesManager from "../../components/Routesmanager";

const Home = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <ShowUsers></ShowUsers>
    </>
  );
};

export default routesManager(Home);
