import React, { Component } from 'react'
import Lottie from 'react-lottie';
import likeAnimation from '@/assets/lottie/heart';


class FavoriteAnimation extends Component {
  static defaultProps = {
    animation: '',
    width: '100%',
    height: '100%',
    loop: false,
    autoPlay: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isStopped: !this.props.autoPlay,
      isPaused: !this.props.autoPlay,
      isComplete: false,
    }
  };

  handleClick = () => {
    this.setState({ isPaused: !this.state.isPaused })
  };

  handleEvent = (obj) => {
    if (!this.props.loop) {
      if (obj.currentTime === (obj.totalTime - 1)) {
        if (this.state.isComplete) {
          this.setState({ isStopped: true, isComplete: false })
        } else {
          this.setState({ isStopped: false, isComplete: true })
        }
      }
    }
  };

  render() {
    const animation = likeAnimation;
    const defaultOptions = {
      loop: this.props.loop,
      autoplay: this.props.autoPlay,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    const makeValidNumber = (value) =>
        value.substr(value.length - 1) === '%' ? value : Number(value);

    return (
        <div className="Lottie_iconHeart">
          <Lottie
              onClick={this.handleClick}
              options={defaultOptions}
              width={makeValidNumber(this.props.width)}
              height={makeValidNumber(this.props.height)}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
              speed={2}
              eventListeners={
                [
                  {
                    eventName: 'enterFrame',
                    callback: obj => this.handleEvent(obj),
                  },
                ]
              }
          />
        </div>
    )
  }
}

export default FavoriteAnimation;
