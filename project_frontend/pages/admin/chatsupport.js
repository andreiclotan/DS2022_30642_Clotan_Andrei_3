import UserNavbar from "../../components/UserNavbar";
import routesManager from "../../components/Routesmanager";
import ChatPage from "../../components/ChatPage";
import { useSelector } from "react-redux";
import AdminNavbar from "../../components/AdminNavbar";
import { useRouter } from "next/router";

const Home = () => {
  const chatId = useSelector((state) => state.auth.chatId);
  const router = useRouter();
  chatId == null ? router.push("/admin/support") : null;
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <ChatPage chatId={chatId}></ChatPage>
    </>
  );
};

export default routesManager(Home);
