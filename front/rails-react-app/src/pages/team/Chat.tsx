import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';
import useChat from 'Hooks/team/Chat';
import { Row, Col, Image, Typography, Affix } from 'antd';
import { defaultCoverImage } from 'utils';
import BackButton from 'components/molecules/BackButton';
import ChatRoom from 'components/organisms/Chat';
import ChatForm from 'components/molecules/ChatForm';

type Props = {
  isSmall: boolean;
};

const Chat: FC<Props> = ({ isSmall }) => {
  const authUser = useAuthUser();
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [state, { createNewComment }] = useChat(authUser, Number(fileId));
  const onSend = async (data: string) => {
    await createNewComment(data);
  };

  return (
    <>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      />
      <Row>
        <Col xs={24} md={12}>
          <Image
            src={state.file?.image ? state.file.image : defaultCoverImage}
            width="90%"
            height="auto"
          />
        </Col>
        <Col xs={24} md={12} style={{ paddingBottom: 50 }}>
          <Typography.Title style={{ textAlign: 'center' }}>
            {state.file?.file.title}
          </Typography.Title>
          <Typography.Text
            style={{
              textAlign: 'center',
              display: 'block',
              width: '90%',
              margin: '0 auto',
            }}
          >
            {state.file?.file.description}
          </Typography.Text>
          {authUser ? (
            <ChatRoom comments={state.comments} userId={authUser.id} />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Affix offsetBottom={30} style={{ position: 'absolute', right: 30 }}>
        <div style={{ width: isSmall ? '80vw' : '40vw' }}>
          <ChatForm onSend={onSend} />
        </div>
      </Affix>
    </>
  );
};

export default Chat;
