import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Navbar from "./Navbar";

export default function AdminNavbar() {
  const links = (
    <>
      <Link href="/admin/users" className={styles.navlink}>
        Users
      </Link>
      <Link href="/admin/assignations" className={styles.navlink}>
        Assignations
      </Link>
      <Link href="/admin/devices" className={styles.navlink}>
        All Devices
      </Link>
      <Link href="/admin/support" className={styles.navlink}>
        Support
      </Link>
    </>
  );
  return <Navbar logo_href="/user">{links}</Navbar>;
}
