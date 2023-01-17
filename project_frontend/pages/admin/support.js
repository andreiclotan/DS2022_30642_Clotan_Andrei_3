import AdminNavbar from "../../components/AdminNavbar";
import ShowUsers from "../../components/ShowUsers";
import routesManager from "../../components/Routesmanager";
import ShowChatUsers from "../../components/ShowChatUsers";

const Home = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <ShowChatUsers></ShowChatUsers>
    </>
  );
};

export default routesManager(Home);
