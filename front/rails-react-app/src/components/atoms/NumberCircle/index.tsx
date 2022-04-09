import { FC } from 'react';

type Props = {
  number: number;
  size: number;
  color: string;
};

const NumberCircle: FC<Props> = ({ number, size, color }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        color: 'white',
        textAlign: 'center',
        backgroundColor: color,
      }}
    >
      <p>{number}</p>
    </div>
  );
};

export default NumberCircle;
