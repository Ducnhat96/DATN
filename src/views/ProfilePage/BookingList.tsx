import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { compose } from "recompose";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../../layouts/Grid/Container";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import fb from "@/assets/facebook.png";
import gg from "@/assets/google.png";
import twt from "@/assets/twitter.png";
import Location from "@material-ui/icons/LocationOnOutlined";
import StarRatings from "react-star-ratings";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  getUserBookingList,
  IProfileContext,
  ProfileContext
} from "@/store/context/Profile/ProfileContext";
import _ from "lodash";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import moment from "moment";
import "moment/locale/vi";
import { formatMoney } from "@/utils/mixins";
import DialogBookingDetails from "@/views/ProfilePage/DialogBookingDetails";
import DialogReviewDetails from "@/views/ProfilePage/DialogReviewDetails";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import InsertDriveFileOutlined from "@material-ui/icons/InsertDriveFileOutlined";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/vi_VN";
import "rc-pagination/assets/index.css";
import { axios } from "@/utils/axiosInstance";
import { AxiosRes } from "@/types/Requests/ResponseTemplate";
import { RoomReviewInfoRes } from "@/types/Requests/ReviewRoom/ReviewResponse";
import { Tooltip } from "@material-ui/core";

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    boxBooking: {
      margin: "10px auto",
      padding: 8,
      border: "1px solid rgba(0, 0, 0, 0.12)"
    },
    imageRoom: {
      width: "100%",
      height: 180,
      objectFit: "cover"
    },
    txtAddress: {
      color: "#484848",
      fontSize: 14,
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 12
      }
    },
    iconLocation: {
      verticalAlign: "bottom",
      fontSize: 20,
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 18
      }
    },
    rowMargin: {
      marginBottom: 4
    },
    spanViews: {
      fontSize: 10,
      color: "grey",
      paddingLeft: 5
    },
    imgSocial: {
      width: 17,
      height: 17,
      padding: 5
    },
    borLeft: {
      borderLeft: "1px solid #eee",
      padding: 3,
      textAlign: "center"
    },
    timeBooking: {
      padding: "3px 4px 3px 3px",
      textAlign: "center"
    },
    fontTime: {

      fontSize: 13,
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 11
      }
    },
    typoTotal: {
      alignContent: "flex-end",
      alignItems: "flex-end",
      display: "flex",
      flexFlow: "row-reverse"
    },
    bookAgain: {
      padding: 8
    },
    button: {
      padding: "6px 14px",
      [theme!.breakpoints!.down!("sm")]: {
        padding: "6px 12px"
      },
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: "3vw"
      }
    },
    rowBottom: {
      paddingTop: 8
    },
    typoDay: {
      fontSize: "2.5vw",
      [theme!.breakpoints!.down!("md")]: {
        fontSize: "3vw"
      }
    },
    typoName: {
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 17,
        lineHeight: 1.2
      }
    },
    typoTotalFee: {
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 17
      }
    },
    fakeData: {
      width: "100%",
      padding: "75px 0"
    },
    iconNote: {
      color: "#757575",
      fontSize: 40
    },
    boxPagination: {
      display: "flex",
      justifyContent: "center"
    },
    customWidth: {
      maxWidth: 500
    },
    noMaxWidth: {
      maxWidth: "none"
    },
    boxImg: {
      padding: 0
    }
  });

interface IBookingList {
  classes?: any;
  status: number;
}

const BookingList: ComponentType<IBookingList> = (props: IBookingList) => {
  const { classes, status } = props;
  const [openDialog, setOpenDialog] = useState<number>(0);
  const [openDialogReview, setOpenDialogReview] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IProfileContext>(ProfileContext);
  const { bookings, metaBookings } = state;

  // useEffect(() => {
  //   console.log(currentPage);
  // })

  if (bookings == null) {
    return <SimpleLoader />;
  }
  useEffect(() => {
    setLoading(true);
    getUserBookingList(props.status, currentPage)
      .then(res => {
        // console.log('response')
        dispatch({
          type: "setDataBooking",
          bookings: res.data,
          meta: res.meta
        });
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    if (!isLoading && bookings.length === 0) {
      setEmpty(true);
    }
  }, [isLoading]);

  useEffect(() => { }, [bookings]);

  const handleClick = (id: number) => {
    setOpenDialog(id);
  };

  const handleBookAgain = (id: number) => {
    history.push(`/room/${id}`);
  };
  const CancelBooking = (id: number) => {
    history.push(`/booking-cancel/${id}`);
  };

  const ChangePage = (current: number) => {
    setCurrentPage(current);
  };

  const toReview = (id: number) => {
    //console.log(review_url);
    //console.log(id);
    history.push(`/reviews/${id}`);
  };

  const ShowReview = (id: number) => {
    setOpenDialogReview(id);
  };

  const mapBookings = _.map(bookings, i => {
    const room = i.room.data;
    return (
      <GridContainer xs={12} sm={12} md={12} lg={11} key={i.id}>
        <Paper elevation={0} classes={{ root: classes.boxBooking }}>
          <Grid container spacing={16} direction="row" justify="center">
            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.boxImg}>
              <img
                alt="image room"
                src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                  room.media.data[0].image
                  }`}
                className={classes.imageRoom}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={6}
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" className={classes.typoName}>
                    {room!.details.data[0].name}
                  </Typography>
                </Grid>
                <Grid item className={classes.rowMargin}>
                  <StarRatings
                    rating={room!.avg_rating} //index rating
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#FFC412"
                  />
                  <span className={classes.spanViews}>
                    {room!.total_review} đánh giá
                  </span>
                </Grid>
                <Grid item className={classes.rowMargin}>
                  <span className={classes.txtAddress}>
                    <Location className={classes.iconLocation} />
                    {room!.details.data[0].address}
                  </span>
                </Grid>
              </Grid>
              <Grid container direction="column">
                {/* <Grid item>
                  <img alt = 'fb social' src = {fb} className = {classes.imgSocial} />
                  <img alt = 'gg social' src = {gg} className = {classes.imgSocial} />
                  <img alt = 'tw social' src = {twt} className = {classes.imgSocial} />
                </Grid> */}

                <Hidden
                  lgDown={status == 2 || status == 5 || status == 1}
                  lgUp={status == 2 || status == 5 || status == 1}
                >
                  <Grid item className={classes.rowMargin}>
                    {i.status_reviews == 1 ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => ShowReview(i.id)}
                      >
                        Xem Đánh giá
                      </Button>
                    ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => toReview(i.id)}
                        >
                          Đánh giá
                      </Button>
                      )}
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              container
              direction="row"
              justify="space-around"
            >
              <Grid item sm={12} container spacing={0}>
                <Grid item xs={6} sm>
                  <Grid item className={classes.timeBooking}>
                    <Typography variant="button" style={{ fontWeight: 600 }}>
                      Từ
                      <Hidden smUp>
                        <span>: {moment(i.checkin).format("DD-MM-YYYY")}</span>
                      </Hidden>
                    </Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item container className={classes.timeBooking}>
                      <Grid item>
                        <Typography className={classes.fontTime}>
                          {moment(i.checkin).format("DD")} /{" "}
                          {moment(i.checkin).format("MM")} /{" "}
                          {moment(i.checkin).format("Y")}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={8}>
                        <Typography className={classes.fontTime}>
                          {moment(i.checkin).format("dddd")}
                        </Typography>
                        <Typography className={classes.fontTime}>
                          <span></span>
                          <span> {moment(i.checkin).format("YYYY")}</span>
                        </Typography>
                      </Grid> */}
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item xs={6} sm>
                  <Grid item className={classes.borLeft}>
                    <Typography variant="button" style={{ fontWeight: 600 }}>
                      Đến
                      <Hidden smUp>
                        <span>: {moment(i.checkout).format("DD-MM-YYYY")}</span>
                      </Hidden>
                    </Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item container className={classes.borLeft}>
                      <Grid item>
                        <Typography className={classes.fontTime}>
                          {moment(i.checkout).format("DD")} /{" "}
                          {moment(i.checkout).format("MM")} /{" "}
                          {moment(i.checkout).format("Y")}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={4}>
                        <Typography variant="h4" className={classes.typoDay}>
                          {moment(i.checkout).format("DD")}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className={classes.fontTime}>
                          {moment(i.checkout).format("dddd")}
                        </Typography>
                        <Typography className={classes.fontTime}>
                          <span>{moment(i.checkout).format("MMM")}</span>
                          <span> {moment(i.checkout).format("YYYY")}</span>
                        </Typography>
                      </Grid> */}
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item sm={12} className={classes.typoTotal}>
                <Typography
                  variant="h6"
                  align="right"
                  className={classes.typoTotalFee}
                >
                  <span>Total: </span>
                  <span> {formatMoney(i.total_fee)} </span>
                  <span> VND</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={16} direction="row" justify="space-between">
            <Grid
              item
              container
              justify="space-around"
              xs={8}
              sm={4}
              md={4}
              lg={3}
            >
              <div className={classes.rowBottom}>
                <Hidden
                  lgDown={status == 2 || status == 1}
                  lgUp={status == 2 || status == 1}
                >
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => handleBookAgain(room!.id)}
                  >
                    Đặt lại
                  </Button>
                </Hidden>
                <Hidden
                  lgDown={status == 4 || status == 5}
                  lgUp={status == 4 || status == 5}
                >
                  <Button
                    color="inherit"
                    className={classes.button}
                    onClick={() => CancelBooking(i.id)}
                  >
                    Hủy đơn
                  </Button>
                </Hidden>
                {/*<Button color = 'primary' className = {classes.button}>*/}
                {/*Gửi biên lai*/}
                {/*</Button>*/}
              </div>
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={4} md={4} lg={3}>
              <div className={classes.rowBottom}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleClick(i.id)}
                >
                  Chi tiết
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <DialogBookingDetails
          stateOpen={openDialog}
          setStateOpen={setOpenDialog}
          dataBooking={i}
        />
        <DialogReviewDetails
          stateOpen={openDialogReview}
          setStateOpen={setOpenDialogReview}
          id_review={i.id}
          room_id={i.room_id}
        />
      </GridContainer>
    );
  });

  return (
    <Fragment>
      {bookings.length > 0 && !isEmpty ? (
        <Fragment>
          {mapBookings}
          <div className={classes.boxPagination}>
            <Pagination
              className="ant-pagination"
              locale={localeInfo}
              total={metaBookings!.pagination.total}
              pageSize={metaBookings!.pagination.per_page}
              current={currentPage}
              onChange={ChangePage}
            />
          </div>
        </Fragment>
      ) : (
          ""
        )}
      {isLoading ? (
        <div className={classes.fakeData}>
          <SimpleLoader width={100} height={100} />
        </div>
      ) : (
          ""
        )}
      {isEmpty ? (
        <div className={classes.fakeData}>
          <div style={{ textAlign: "center" }}>
            <InsertDriveFileOutlined
              color="secondary"
              className={classes.iconNote}
            />
          </div>
          <Typography align="center" variant="h5" color="textSecondary">
            Danh sách trống
          </Typography>
        </div>
      ) : (
          ""
        )}
    </Fragment>
  );
};

export default compose<IBookingList, any>(withStyles(styles))(BookingList);
