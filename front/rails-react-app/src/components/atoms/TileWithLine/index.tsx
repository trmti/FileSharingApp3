import { FC } from 'react';
import { Typography } from 'antd';
import styles from './index.module.css';

type Props = {
  children: string;
  style?: any;
};

const TitleWithLine: FC<Props> = ({ children, style }) => {
  return (
    <Typography.Title style={style} className={styles.titleText}>
      {children}
    </Typography.Title>
  );
};

export default TitleWithLine;
