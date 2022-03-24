import { FC } from 'react';
import { Row, Col, Card } from 'antd';
import { File } from 'type';
import { colors } from 'app_design';

const { Meta } = Card;

type Props = {
  files: File[] | null;
  onClick: (id: number) => void;
};

const Files: FC<Props> = ({ files, onClick }) => {
  if (files !== null) {
    return (
      <div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
        <Row gutter={30} wrap={false}>
          {files.map(({ image, file: { title, description, id } }) => {
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
                      src={image ? image : undefined}
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
    );
  } else {
    return <>test</>;
  }
};

export default Files;
