// ---Dependencys
import React from 'react';
import { Skeleton, Card, Avatar } from 'antd';
// ------------------------------------------ COMPONENT-----------------------------------------
const { Meta } = Card;

function LazyBanner() {
  return (
    <Card style={{ width: '100%', marginTop: 16 }}>
      <Skeleton loading avatar active>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
    </Card>
  );
}

export default LazyBanner;
