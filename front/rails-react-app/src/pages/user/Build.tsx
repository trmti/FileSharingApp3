import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildTeamParams } from 'type';
import { message } from 'antd';
import { useAuthUser } from 'auth/AuthUserContext';
import { createSome } from 'db/utils';
import TitleWithLine from 'components/atoms/TileWithLine';
import FormBuildTeam from 'components/organisms/FormTeam';

const Build: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuthUser();
  const navigate = useNavigate();
  const onFinish = async (data: BuildTeamParams) => {
    setLoading(true);
    if (user) {
      const res = await createSome('user', 'team', data, user.id);
      if (res.status === 'success') {
        message.success('チームを作成しました。');
        navigate('/user/home');
      } else if (res.status === 'continue') {
        message.info(res.message);
        navigate('/user/home');
      } else {
        message.error(res.message);
      }
    } else {
      message.error('この機能はログイン後にしか利用できません');
    }
    setLoading(false);
  };

  const onFinishFailed = () => {
    message.error('入力されていない欄があります。');
  };
  return (
    <>
      <TitleWithLine
        style={{ display: 'block', textAlign: 'center', marginBottom: 40 }}
      >
        チームを作成
      </TitleWithLine>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <FormBuildTeam
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Build;
