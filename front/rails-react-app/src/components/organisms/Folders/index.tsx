import { FC } from 'react';
import { Row, Col, Card, Typography, Popconfirm } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { colors, text_style } from 'app_design';
import { defaultCoverImage } from 'utils';
import { FolderWithImage, publish_range } from 'type';

const { Meta } = Card;

type Props = {
  folders: FolderWithImage[] | null;
  onClick: (id: number) => void;
  onClickNewFolder: () => void;
  isEditor: boolean;
  publish_range: publish_range | undefined;
};
const Folders: FC<Props> = ({
  folders,
  onClick,
  onClickNewFolder,
  isEditor,
  publish_range,
}) => {
  if (publish_range === 'private' && !isEditor) {
    return (
      <Typography
        style={{
          fontSize: text_style.Title_M.fontSize,
          color: colors.Text.Gray,
        }}
      >
        フォルダーが見れません。チームに参加申請を送ってください。
      </Typography>
    );
  } else {
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
            {folders
              ? folders.map(({ image, folder: { title, description, id } }) => {
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
                        <Meta
                          title={title}
                          description={
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Popconfirm
                                title={
                                  <div
                                    style={{
                                      width: 300,
                                      overflowWrap: 'break-word',
                                    }}
                                  >
                                    <p
                                      style={{
                                        whiteSpace: 'pre-wrap',
                                      }}
                                    >
                                      {description
                                        ? description
                                        : 'No Description'}
                                    </p>
                                  </div>
                                }
                                icon={null}
                                showCancel={false}
                              >
                                <Typography.Paragraph ellipsis>
                                  {description ? description : 'No description'}
                                </Typography.Paragraph>
                              </Popconfirm>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })
              : () => {}}
          </Row>
        </div>
      </>
    );
  }
};

export default Folders;
