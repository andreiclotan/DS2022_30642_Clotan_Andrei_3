import UserNavbar from "../../components/UserNavbar";
import routesManager from "../../components/Routesmanager";
import ChatPage from "../../components/ChatPage";

const Home = () => {
  return (
    <>
      <UserNavbar></UserNavbar>
      <ChatPage></ChatPage>
    </>
  );
};

export default routesManager(Home);
