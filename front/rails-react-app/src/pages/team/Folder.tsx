import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilesByFolderId } from 'db/file';
import { File } from 'type';
import FolderTemp from 'components/templates/Folder';

const Folder: FC = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { folderId } = useParams();
  const onClick = (id: number) => {
    console.log(id);
  };
  const onChangeSort = (value: string) => {
    console.log(value);
  };
  useEffect(() => {
    if (folderId) {
      (async () => {
        const newFiles = await getFilesByFolderId(Number(folderId));
        if (newFiles.status === 'success') {
          setFiles(newFiles.data);
        } else {
          setFiles(null);
        }
      })();
    }
  }, [folderId]);
  return (
    <>
      <FolderTemp files={files} onClick={onClick} onChangeSort={onChangeSort} />
    </>
  );
};

export default Folder;
