import React, { ComponentType } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/assets/Lottie/looking_around.json';
import { Typography } from '@material-ui/core';

interface IProps {
  height?: number;
  width?: number;
}

const SimpleLoader: ComponentType<IProps> = props => {

  const defaultOptions: any = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <span style={{ margin: '20px 0' }}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        Rất tiếc, không còn phòng trống cho ngày bạn chọn.
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' style={{ textAlign: 'center' }}>
        Bạn vui lòng thay đổi thông tin tìm kiếm như số khách, ngày nhận/trả phòng để nhận các thông tin phòng trống khác
      </Typography>
    </span>
  );
};

export default SimpleLoader;

