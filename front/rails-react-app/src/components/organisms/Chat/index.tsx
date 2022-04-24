import { FC } from 'react';
import { Avatar } from 'antd';
import { CommentWithImage } from 'type';
import styled from 'styled-components';

const ChatLeft = styled.div`
  display: inline-block;
  position: relative;
  margin: 5px 0 0 15px;
  padding: 17px 13px;
  border-radius: 12px;
  background: #edf1ee;
  letter-spacing: 0.1em;
  white-space: pre-wrap;
  :after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 18px;
    left: -24px;
    border: 12px solid transparent;
    border-right: 12px solid #edf1ee;
  }
`;

const ChatRight = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  text-align: left;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;
  letter-spacing: 0.1em;
  white-space: pre-wrap;
  :after {
    content: '';
    position: absolute;
    top: 3px;
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid #30e852;
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
`;

type Props = {
  comments: CommentWithImage[];
  userId: number;
};

const Chat: FC<Props> = ({ comments, userId }) => {
  console.log(comments);
  if (comments) {
    return (
      <div style={{ height: '60vh', overflowY: 'scroll' }}>
        {comments.map((comment, index) => (
          <div style={{ marginTop: 10, width: '80%' }} key={index}>
            {userId === comment.comment.user_id ? (
              <div style={{ textAlign: 'right' }}>
                <ChatRight>{comment.comment.text}</ChatRight>
              </div>
            ) : (
              <div>
                <Avatar src={comment.user_image} size={60} />
                <ChatLeft>{comment.comment.text}</ChatLeft>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Chat;
