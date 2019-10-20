import React, {ComponentType} from 'react';
import Lottie        from 'react-lottie';
import animationData from '@/assets/Lottie/simple_loader.json';

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
    <span>
      <Lottie
        options = {defaultOptions}
        isClickToPauseDisabled = {true}
        height = {props.height || 25}
        width = {props.width || 70}
      />
    </span>
  );
};

export default SimpleLoader;

