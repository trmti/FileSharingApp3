import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { File } from 'type';
import FolderTemp from 'components/templates/Folder';

const Folder: FC = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { folderId } = useParams();
  const onClick = (id: number) => {
    console.log(id);
  };
  useEffect(() => {
    if (folderId) {
    }
  }, []);
  return <FolderTemp files={files} onClick={onClick} />;
};

export default Folder;
