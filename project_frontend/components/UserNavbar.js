import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Navbar from "./Navbar";

export default function UserNavbar() {
  const links = (
    <>
      <Link href="/user/devices" className={styles.navlink}>
        Devices
      </Link>
      <Link href="/user/support" className={styles.navlink}>
        Support
      </Link>
    </>
  );
  return <Navbar logo_href="/user">{links}</Navbar>;
}
