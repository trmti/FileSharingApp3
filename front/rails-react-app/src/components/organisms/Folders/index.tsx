import { FC } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { colors, text_style } from 'app_design';
import { defaultCoverImage } from 'utils';
import { FolderWithImage } from 'type';

const { Meta } = Card;

type Props = {
  folders: FolderWithImage[] | null;
  onClick: (id: number) => void;
  onClickNewFolder: () => void;
};
const Folders: FC<Props> = ({ folders, onClick, onClickNewFolder }) => {
  if (folders !== null) {
    return (
      <>
        <Typography.Title>フォルダ</Typography.Title>
        <div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <Row gutter={30} wrap={false}>
            <Card
              style={{
                width: 300,
                height: 350,
              }}
              bodyStyle={{ backgroundColor: colors.Card }}
              cover={
                <FolderAddOutlined
                  style={{
                    height: 250,
                    width: 300,
                    fontSize: 250,
                    opacity: 0.5,
                  }}
                />
              }
              hoverable
              onClick={onClickNewFolder}
            >
              <Meta
                title="新規フォルダ"
                description="クリックして新しいフォルダを作る"
              />
            </Card>
            {folders.map(({ image, folder: { title, description, id } }) => {
              return (
                <Col key={id}>
                  <Card
                    style={{
                      width: 300,
                      height: 350,
                    }}
                    bodyStyle={{ backgroundColor: colors.Card }}
                    cover={
                      <img
                        alt="team"
                        src={image ? image : defaultCoverImage}
                        width="auto"
                        height={250}
                      />
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
