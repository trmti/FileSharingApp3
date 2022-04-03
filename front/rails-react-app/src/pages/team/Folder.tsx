import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { showFolder } from 'db/folders';
import { getFilesByFolderId, createFile } from 'db/file';
import { FileWithImage, BuildFileParams } from 'type';
import FolderTemp from 'components/templates/Folder';

const Folder: FC = () => {
  const [files, setFiles] = useState<FileWithImage[] | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { folderId } = useParams();
  const onClick = (id: number) => {
    console.log(id);
  };
  const onChangeSort = (value: string) => {
    console.log(value);
  };
  const onFinish = async (data: BuildFileParams) => {
    const res = folderId ? await createFile(data, Number(folderId)) : null;
    if (res?.status === 'success') {
      message.success('チームの作成に成功しました');
      setIsModalVisible(false);
      await setNewFiles();
    } else {
      message.error(res?.message);
    }
  };

  const setNewFiles = async () => {
    const newFiles = await getFilesByFolderId(Number(folderId));
    if (newFiles.status === 'success') {
      setFiles(newFiles.data);
    } else {
      setFiles(null);
    }
  };
  const onFinishFailed = () => {
    message.error('画像を選択してください');
  };
  useEffect(() => {
    if (folderId) {
      (async () => {
        await setNewFiles();
        const folder = folderId ? await showFolder(Number(folderId)) : null;
        if (folder?.status === 'success') {
          setFolderName(folder.data.title);
        } else {
          setFolderName(null);
        }
      })();
    }
  }, [folderId]);
  return (
    <>
      <FolderTemp
        files={files}
        onClick={onClick}
        onChangeSort={onChangeSort}
        folderName={folderName}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default Folder;
