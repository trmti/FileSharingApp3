import { FC } from 'react';

type Props = {
  onClick: () => void;
  style?: {};
};

const BackButton: FC<Props> = ({ onClick, style }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
    >
      <img src={`${process.env.PUBLIC_URL}/icon/Arrow.png`} alt="Arrow" />
      <p style={{ marginTop: 15 }}>Back</p>
    </div>
  );
};

export default BackButton;
