import React from 'react';
import { Card, Skeleton } from 'antd';
// import { Link } from 'react-router-dom';

const LoadingCard = () => {
  return (
    <Card style={{ width: '90%', margin: '10px auto 10px auto' }}>
      <Skeleton active />
    </Card>
  );
};

export default LoadingCard;
