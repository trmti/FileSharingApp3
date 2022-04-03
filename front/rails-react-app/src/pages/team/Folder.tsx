import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuthUser } from 'auth/AuthUserContext';
import { showFolder } from 'db/folders';
import { getFilesByFolderId, createFile } from 'db/file';
import { deleteSome } from 'db/utils';
import { setInEditor } from 'utils';
import { FileWithImage, BuildFileParams } from 'type';
import FolderTemp from 'components/templates/Folder';

const Folder: FC = () => {
  const [files, setFiles] = useState<FileWithImage[] | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const { folderId, teamId } = useParams();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const onClick = (id: number) => {
    console.log(id);
  };
  const setNewFiles = async () => {
    const newFiles = await getFilesByFolderId(Number(folderId));
    if (newFiles.status === 'success') {
      setFiles(newFiles.data);
    } else {
      setFiles(null);
    }
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
  const onFinishFailed = () => {
    message.error('画像を選択してください');
  };
  const onDelete = async () => {
    const res = await deleteSome(Number(folderId), 'folders');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate(`/user/team/${teamId}`);
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    if (folderId && authUser) {
      (async () => {
        await setNewFiles();
        await setInEditor(setIsEditor, Number(teamId), authUser.id);
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
        onDelete={onDelete}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isEditor={isEditor}
      />
    </>
  );
};

export default Folder;
