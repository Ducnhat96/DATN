import React, { ComponentType } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/assets/Lottie/empty_status.json';
import { Typography } from '@material-ui/core';

interface IProps {
  height?: number;
  width?: number;
  content: string;
}

const NotFoundGlobal: ComponentType<IProps> = (props) => {
  const { content } = props;
  const defaultOptions: any = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <span style={{ margin: '20px 0' }}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        {content}
      </Typography>
    </span>
  );
};

export default NotFoundGlobal;
