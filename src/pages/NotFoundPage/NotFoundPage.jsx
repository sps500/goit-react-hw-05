import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>Page not found</h1>
    <Link to="/" className={styles.link}>
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
