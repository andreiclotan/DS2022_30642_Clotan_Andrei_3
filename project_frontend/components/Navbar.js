import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/actions/authentication";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ children, logo_href = "/" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    loginAction(false, dispatch, null, router);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo_container}>
        <Link href={logo_href} className={styles.navlink}>
          Home
        </Link>
      </div>
      <div className={styles.navbar_content}>
        <div className={styles.meniu_container}>{children}</div>
        <div className={styles.meniu_container} onClick={handleLogout}>
          <p className={styles.navlink}>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
