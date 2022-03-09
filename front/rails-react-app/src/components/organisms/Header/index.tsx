import { VFC } from 'react';
import { Link } from 'react-location';
import styles from './style.module.css';

const Header: VFC = () => {
  return (
    <div className={styles.Header}>
      <Link to="/">
        <p className={styles.Title}>Share-Kosen</p>
      </Link>
      <img
        src={process.env.PUBLIC_URL + '/logo192.png'}
        alt="icon"
        className={styles.Img}
      />
    </div>
  );
};

export default Header;
