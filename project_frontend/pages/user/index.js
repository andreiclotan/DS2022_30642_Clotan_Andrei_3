import UserNavbar from "../../components/UserNavbar";
import routesManager from "../../components/Routesmanager";
import UserPage from "../../components/UserPage";

const Home = () => {
  return (
    <>
      <UserNavbar></UserNavbar>
      <UserPage></UserPage>
    </>
  );
};

export default routesManager(Home);
