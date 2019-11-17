import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext } from 'react';
import { compose } from 'recompose';
import { Coords, ChildComponentProps } from 'google-map-react';
import '@/styles/Custom/bubble.scss';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import classNames from 'classnames';
import { formatMoney } from '@/utils/mixins';
import Blue from '@material-ui/core/colors/blue';
import { scroller } from 'react-scroll';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface IProps extends Required<Coords> {
  classes?: any
  room: RoomIndexRes
  isHover: boolean
}

interface LocalProps extends IProps, ChildComponentProps {

}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.only('xs')]: {
        fontSize: 12,
      },
      position: 'absolute',
      fontSize: '1rem',
      transform: 'translate(-50%, -135%)',
      transition: theme.transitions.create(['all'], {
        duration: 200,
        easing: 'ease-in-out',
      }),
    },
    hover: {
      zIndex: 1,
      backgroundColor: '#ff9800',
      border: `1px solid #ff9800`,
      cursor: 'pointer',
      color: 'white',
      transition: theme.transitions.create(['all'], {
        duration: 200,
        easing: 'ease-in-out',
      }),
    },
    arrowHover: {
      borderColor: `#ff9800 transparent transparent transparent`,
      '&:after': {
        borderColor: `#ff9800 transparent transparent transparent`,
      },
    },
    overBubble: {
      [theme.breakpoints.only('xs')]: {
        minWidth: 30,
      },
    }
  })
);

// @ts-ignore
const MapMarker: ComponentType<IProps> = (props: LocalProps) => {
  const classes = useStyles(props);
  const { room, isHover } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const markerEvent = () => {
    let id = `room-${room.id}`;
    let offset = -80;
    if (width === 'md' || width === 'sm') {
      offset = Math.floor(window.innerHeight / -1.9);
    }

    let effect: ReactScrollLinkProps = {
      containerId: 'room-map-list',
      to: id,
      smooth: 'easeInOutQuad',
      offset,
    };
    scroller.scrollTo(id, effect);
  };

  return (
    <Fragment>
      <div onClick={markerEvent} className={classNames(
        'speech-bubble', classes.root, classes.overBubble, {
          [classes.hover]: isHover,
        }, classes.speechBubbleOver
      )}>
        <div className={classNames(
          'arrow', 'bottom', {
            [classes.arrowHover]: isHover,
          },
        )} />
        <span>
          {formatMoney(room.price_day, 0)}đ
        </span>
      </div>
    </Fragment>
  );
};

const memoCheck = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.isHover === nextProps.isHover;
};

export default compose<IProps, any>(
)(React.memo(MapMarker, memoCheck));
