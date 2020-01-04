import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext } from 'react';
import { compose } from 'recompose';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgRoomDemo from '@/assets/room_demo.jpeg';
import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import imgRoomDemo3 from '@/assets/room_demo3.jpeg';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { formatMoney } from '@/utils/mixins';
import { Formik, FormikActions } from 'formik';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { newRoomLocation } from '@/store/context/Room/RoomIndexContext';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';

import LazyLoad from 'react-lazyload';
import { windowExist } from '@/index';

interface IProps {
   classes?: any,
   room: NumberRoomCity,
}

const styles: any = (theme: ThemeCustom) => createStyles({
   root: {
      textAlign: 'center',
      paddingTop: '0.2em',
      backgroundColor: theme!.palette!.background!.paper!,
   },
   gridList: {
      width: '100%',
      height: 'auto',
   },
   gridListTile: {
      borderRadius: '8px',
      width: '100% !important',
   },
   gridListTileBar: {
      textAlign: 'center',
      fontWeight: 700
   },
   titleListTileBar: {
      fontSize: '1.1em',
   },
   subtitleListTileBar: {
      fontSize: '0.8em',
   },
   imageCity: {
      WebkitTransform: 'scale(1) ',
      left: '0 ',
      transform: 'none',
      WebkitTransition: '.3s ease-in-out',
      transition: '.3s ease-in-out',
      '&:hover': {
         WebkitTransform: 'scale(1.2) ',
         transform: 'scale(1.2) ',
      },
   },
   borRadius: {
      borderRadius: 8,
      cursor: 'pointer',
   },
});

// @ts-ignore
const RoomCity: ComponentType<IProps> = (props: IProps) => {
   const { classes, room } = props;
   const { history } = useContext<IGlobalContext>(GlobalContext);

   const locationRoom = (values: NumberRoomCity) => {
      const pushQuery: RoomUrlParams = {
         city_id: values.city_id,
      };

      const location = newRoomLocation(pushQuery);
      history.push(location);
   };

   return (
      <Fragment>
         <div className={classes.root} onClick={() => locationRoom(room)}>
            <GridList className={classes.gridList}>
               <GridListTile className={classes.gridListTile} classes={{ tile: classes.borRadius }}>
                  <LazyLoad height={0} offset={windowExist ? window.innerHeight : 0}>
                     <img style={{ width: '100%', minHeight: '210px' }} src={room.image} className={classes.imageCity} alt={`VN-Homestay - Homestay cho mọi người`} />
                  </LazyLoad>
                  <GridListTileBar
                     className={classes.gridListTileBar}
                     title={room.name_city}
                     subtitle={
                        <span style={{ fontWeight: 600 }}>
                           Trung bình {`${formatMoney(room.average_price, 0)}`} <sup>đ</sup><sub>/đêm</sub>
                        </span>
                     }
                     classes={{ title: classes.titleListTileBar, subtitle: classes.subtitleListTileBar }}
                  />
               </GridListTile>
            </GridList>
         </div>
      </Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(RoomCity);
