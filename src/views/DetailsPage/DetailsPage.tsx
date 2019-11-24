import { ThemeCustom } from '@/components/Theme/Theme';
import NavSearch from '@/components/ToolBar/NavSearch';
import NavTop from '@/components/ToolBar/NavTop';
import GridImage from '@/views/DetailsPage/GridImage';
import BoxDetails from '@/views/DetailsPage/BoxDetails';
import BoxReviews from '@/views/DetailsPage/BoxReviews';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import SliderSuggest from '@/views/DetailsPage/SliderSuggest';
import NavBottomBook from '@/views/DetailsPage/NavBottomBook';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { ComponentType, useContext, useEffect, useReducer, useState, useMemo, memo, Dispatch } from 'react';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button/Button';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper/Paper';
import {
  RoomDetailsAction,
  RoomDetailsContext,
  RoomDetailsReducer,
  RoomDetailsState,
  RoomDetailsStateInit,
  getData,
} from '@/store/context/Room/RoomDetailsContext';
import { match, RouteChildrenProps } from 'react-router';
import { GlobalContext, IGlobalContext } from '@/store/context/GlobalContext';
import Typography from '@material-ui/core/Typography/Typography';
import DatePickerRoomDetail from '@/components/Utils/DatePickerRoomDetail';
import { BOOKING_TYPE_DAY } from '@/utils/store/global';
import useFocusTitle from '@/utils/focusState';
import { ReducersType, ReducersList } from '@/store/reducers';
import { SearchFilterAction, DateRange } from '@/store/reducers/searchFilter';
import { connect } from 'react-redux';
import LocationHomeMap from "@/views/DetailsPage/LocationHomeMap";
import Footer from '@/layouts/Main/Footer';
import { Helmet } from 'react-helmet';
import BoxRoomDetails from './BoxRoomDetails';
interface IProps extends RouteChildrenProps {
  classes?: any,
  match: match<any>
}

interface LocalProps extends IProps {
  roomRecently: number[]
  updateRoomRecently(list: number[]): void
}

const styles: any = (theme: ThemeCustom) => createStyles({
  boxGridImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 440,
    [theme!.breakpoints!.down!('sm')]: {
      maxHeight: 335,
    },
    overflow: 'hidden',
    position: 'relative',
  },
  div_btnMore: {
    position: 'absolute',
    bottom: '4%',
    right: '2%',
  },
  btnMore: {
    backgroundColor: '#fff',
    color: '#343434',
    MozTransition: 'all 0.3s',
    WebkitTransition: 'all 0.3s',
    transition: 'all 0.3s',
    border: 'none',
    fontWeight: 600,
    '&:hover': {
      MsTransform: 'scale(1.1)', /* IE 9 */
      WebkitTransform: 'scale(1.1)', /* Safari 3-8 */
      transform: 'scale(1.1)',
      backgroundColor: '#fff',
    },
  },
  boxDetails: {
    width: '100%',
    paddingTop: 15,
    backgroundColor: '#fafafa',
    [theme!.breakpoints!.down!('sm')]: {
      paddingTop: 0,
    },
  },
  boxPadding: {
    padding: 16,
    [theme!.breakpoints!.down!('xs')]: {
      padding: '10px 0',
    },
  },
  boxSuggest: {
    margin: '10px 0',
    padding: '16px 0',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '0px 10px',
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    color: '#484848',
    padding: '8px 0',
  },
  divider: {
    margin: '8px 0',
  },
  paperDetail: {
    border: '1px solid #e4e4e4',
    [theme!.breakpoints!.down!('xs')]: {
      border: 'none',
    },
  },
  PaperBooking: {
    // border:'1px solid #e4e4e4',
    position: 'sticky',
    top: '8%',
    left: 'auto',
    right: 0,
  },
  titleHighlight: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: '#484848',
  },
  rowMargin: {
    margin: '10px 0',
    padding: '12px 10px',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '10px 0px',
    },
    borderTop: '1px solid #e0e0e0',
  },
  boxMap: {
    height: 350,
    margin: '10px 0',
    borderRadius: 5,
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  },
  paddingXS: {
    [theme!.breakpoints!.down!('xs')]: {
      width: '95%',
      margin: '0 auto',
    },
  },
});

// @ts-ignore
const DetailsPage: ComponentType<IProps> = (props: LocalProps) => {
  const { classes, match, roomRecently, updateRoomRecently } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer<RoomDetailsState, RoomDetailsAction>(RoomDetailsReducer, RoomDetailsStateInit);
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const { bookingType, room } = state;

  const roomTitle = useMemo(() => {
    return (room !== null && room!.details.data[0].name !== null) ? room!.details.data[0].name : "Chưa cập nhật tên phòng";
  }, [room]);

  // const roomStatus = useMemo(() => {
  //   return room !== null ? room.status : 0;
  // }, [room])

  useEffect(() => {
    let id = parseInt(match.params.id);
    getData(id, dispatch, history);
    // Store room recently viewed

    let roomRecentlyAfter: number[] = roomRecently ? [...roomRecently] : [];
    roomRecentlyAfter.unshift(id);
    // @ts-ignore
    roomRecentlyAfter = [...new Set(roomRecentlyAfter)];

    if (roomRecentlyAfter.length > 5) {
      roomRecentlyAfter.pop();
    }
    updateRoomRecently(roomRecentlyAfter);
  }, []);

  useFocusTitle(roomTitle, roomTitle, room);

  return (
    <RoomDetailsContext.Provider value={{ state, dispatch }}>
      {/* <Helmet>
        <meta charSet='utf-8' />
        <title>{room ? room!.details.data[0].name : 'Homestay'}</title>
        <meta property="og:image" content={room ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
          room!.media.data[0].image
          }` : 'asdf'} />
        <meta property="og:title" content={room ? room!.details.data[0].name : 'Westay - Homestay cho người Việt'} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content={`https://westay.vn/room/${room ? room!.id : ''}`} />
        <meta property="og:site_name" content="Westay - Stay happy together" />
        <meta property="og:description" content={`Westay - Đặt phòng Homestay giá rẻ, tiện lợi, nhanh chóng`} />
      </Helmet> */}
      {/* <div> */}
      <NavTop />
      <Hidden xsDown>
        <NavSearch />
      </Hidden>
      <div className={classes.boxGridImage}>
        <GridImage isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={classes.div_btnMore}>
          <Button className={classes.btnMore} variant='outlined'
            size='small' onClick={() => setIsOpen(true)}
          >Xem thêm</Button>
        </div>
      </div>
      <div className={classes.boxDetails}>
        <GridContainer xs={12} sm={12} md={11} lg={11} xl={10}>
          <Grid container justify='center'>
            <Grid item sm={12} md={11} lg={6} xl={6} className={classes.boxPadding}>
              <Paper elevation={0}>
                <div className={classes.boxPadding}>
                  {/* <BoxDetails /> */}
                  {room ? (<BoxRoomDetails room={room} />) : ''}
                  {room ? (
                    <DatePickerRoomDetail
                      minNights={bookingType === BOOKING_TYPE_DAY ? 1 : 0}
                    />
                  ) : ''}
                  {
                    (room && room!.total_review > 0) ? <BoxReviews review={room.reviews.data} /> : ''
                  }
                  {room ?
                    <div className={classes.rowMargin}>
                      <div className={classes.paddingXS}>
                        <Typography className={classes.titleHighlight}>
                          Bản đồ
                          </Typography>
                        <div className={classes.boxMap}>
                          <LocationHomeMap zoom={14}
                            center={{
                              lat: parseFloat(room!.latitude),
                              lng: parseFloat(room!.longitude),
                            }} />
                        </div>
                      </div>
                    </div>
                    : ''
                  }
                </div>
              </Paper>
            </Grid>
            <Hidden mdDown>
              <Grid item sm={12} md={11} lg={4} xl={4} className={classes.boxPadding}>
                <Paper elevation={2} className={classes.PaperBooking}>
                  <BoxBooking />
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
          <Grid container className={classes.boxPadding}>
            <Grid item xs={12}>
              <div className={classes.boxSuggest}>
                <Typography className={classes.title}>
                  Gợi ý
                  </Typography>
                <SliderSuggest />
              </div>
            </Grid>
          </Grid>
          <Hidden lgUp>
            <Grid container className={classes.boxPadding}>
              <NavBottomBook />
            </Grid>
          </Hidden>
        </GridContainer>
      </div>
      {/* </div> */}
      <Footer />
    </RoomDetailsContext.Provider>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    roomRecently: state.searchFilter.roomRecently,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateRoomRecently: (list: number[]) => dispatch({
      type: 'SET_ROOM_RECENTLY',
      roomRecently: list,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  memo,
)(DetailsPage);
