import { FC } from 'react';
import { File } from 'type';
import Files from 'components/organisms/Files';

type Props = {
  files: File[] | null;
  onClick: (id: number) => void;
};

const Folder: FC<Props> = ({ files, onClick }) => {
  return <Files files={files} onClick={onClick} />;
};

export default Folder;
