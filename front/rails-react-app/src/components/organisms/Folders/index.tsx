import { FC } from 'react';
import { Row, Col, Card, Avatar, Typography } from 'antd';
import { colors, text_style } from 'app_design';
import { FolderWithImage } from 'type';

const { Meta } = Card;

type Props = {
  folders: FolderWithImage[] | null;
  onClick: (id: number) => void;
};
const Folders: FC<Props> = ({ folders, onClick }) => {
  if (folders !== null) {
    return (
      <>
        <Typography.Title>フォルダ</Typography.Title>
        <div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <Row gutter={30} wrap={false}>
            {folders.map(({ image, title, description, id }) => {
              return (
                <Col key={id}>
                  <Card
                    style={{
                      width: 300,
                      height: 350,
                    }}
                    bodyStyle={{ backgroundColor: colors.Card }}
                    cover={
                      <img alt="team" src={image} width="auto" height={250} />
                    }
                    onClick={() => onClick(id)}
                    hoverable
                  >
                    <Meta title={title} description={description} />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </>
    );
  } else {
    return (
      <Typography
        style={{
          fontSize: text_style.Title_M.fontSize,
          margin: '50px 0 40px 100px',
          color: colors.Text.Gray,
        }}
      >
        フォルダーがありません
      </Typography>
    );
  }
};

export default Folders;
