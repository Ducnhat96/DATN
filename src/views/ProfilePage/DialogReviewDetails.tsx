import React, {
  ComponentType,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import { compose } from "recompose";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StarRatings from "react-star-ratings";
import { ThemeCustom } from "@/components/Theme/Theme";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import { TransitionCustom } from "@/views/Rooms/BottomNav";
import {
  SentimentVerySatisfied,
  SentimentVeryDissatisfied
} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { axios } from "@/utils/axiosInstance";
import { AxiosRes } from "@/types/Requests/ResponseTemplate";
import {
  RoomShowReviewRes,
  RoomReviewInfoRes
} from "@/types/Requests/ReviewRoom/ReviewResponse";
import { formatMoney } from "@/utils/mixins";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    txtAddress: {
      color: "#008489",
      fontSize: 14
    },
    iconLocation: {
      verticalAlign: "bottom",
      fontSize: 20
    },
    spanViews: {
      fontSize: 10,
      color: "grey",
      paddingLeft: 5
    },
    dialogTitle: {
      textAlign: "right",
      padding: 0
    },
    dialogContent: {
      padding: "0 16px 16px "
    },
    titleMargin: {
      marginBottom: 16
    },
    titleDetails: {
      textTransform: "uppercase",
      borderBottom: "3px solid #F3A537",
      padding: "5px 0px",
      fontWeight: 600,
      fontSize: 16,
      marginBottom: 10
    },
    imageRoom: {
      width: "100%",
      height: 180,
      objectFit: "cover"
    },
    btStatus: {
      margin: "8px 8px 8px 0"
    },
    contentDetails: {
      fontWeight: 500,
      fontSize: 15
    },
    rowMargin: {
      marginBottom: 4
    },
    card: {
      padding: "0 5px",
      backgroundColor: "transparent !important",
      marginTop: 15
    },
    media: {
      height: "12em",
      borderRadius: "0.2em !important"
    },
    cardContent: {
      padding: 0,
      paddingTop: "1em"
    },
    nameCity: {
      fontWeight: 500,
      fontSize: "0.8em !important",
      lineHeight: "16px !important",
      letterSpacing: "normal !important",
      textTransform: "uppercase",
      color: "rgb(118, 118, 118) !important",
      textOverflow: "ellipsis !important",
      whiteSpace: "nowrap",
      marginBottom: "2px !important",
      overflow: "hidden !important"
    },
    nameRoom: {
      fontWeight: 500,
      fontSize: "1.25em !important",
      lineHeight: "21px !important",
      maxHeight: "42px !important",
      textOverflow: "ellipsis !important",
      display: "-webkit-box !important",
      marginTop: "7px !important",
      marginBottom: "4px !important",
      overflow: "hidden !important",
      color: "rgb(72, 72, 72) !important",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      textTransform: "uppercase"
    },
    priceRoom: {
      fontWeight: "normal",
      fontSize: "1em !important",
      lineHeight: "18px !important",
      letterSpacing: "normal !important",
      color: "rgb(72, 72, 72) !important",
      marginBottom: "4px !important"
    },
    totalReview: {
      overflowWrap: "break-word",
      fontSize: "12px !important",
      fontWeight: 600,
      lineHeight: "1.33333em !important",
      color: "rgb(72, 72, 72) !important",
      margin: "0px !important",
      float: "left",
      paddingLeft: "4px"
    },
    starRatings: {
      float: "left"
    },
    boxPadding: {
      padding: 20
    },
    title: {
      fontWeight: 500,
      fontSize: "1em",
      lineHeight: "21px",
      maxHeight: "42px",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      overflow: "hidden !important",
      color: "rgb(109, 95, 95)",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      marginTop: "13px"
    },
    review: {
      padding: "0px 5px"
    },
    spanLike: {
      fontWeight: 600,
      fontSize: "1em",
      lineHeight: "21px",
      paddingRight: 25,
      color: "rgb(109, 95, 95)"
    },
    radio: {
      paddingLeft: 0,
      display: "block"
    },
    snackContent: {
      backgroundColor: "#43A047"
    },
    iconSnackContent: {
      opacity: 0.9,
      marginRight: 8,
      fontSize: 20
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  })
);

interface IDialogReviewDetails {
  classes?: any;
  stateOpen: number;
  setStateOpen: Dispatch<SetStateAction<number>>;
  id_review: number;
  room_id: number;
}

const DialogBookingDetails: ComponentType<IDialogReviewDetails> = (
  props: IDialogReviewDetails
) => {
  const classes = useStyles(props);
  const { stateOpen, id_review, room_id } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const [roomReview, setRoomReview] = useState<RoomShowReviewRes | null>(null);
  const [room, setRoom] = useState<RoomReviewInfoRes | null>(null);

  const handleClick = (id: number) => {
    props.setStateOpen(id);
  };

  useEffect(() => {
    if (stateOpen === id_review) {
      axios
        .get(`reviews/show-reviews/${props.id_review}`)
        .then((res: AxiosRes<RoomShowReviewRes>) => {
          setRoomReview(res.data.data);
        })
        .catch(err => {});

      axios
        .get(`get-room-for-review/${props.room_id}`)
        .then((res2: AxiosRes<RoomReviewInfoRes>) => {
          setRoom(res2.data.data);
        })
        .catch(err => {});
    }
  }, [stateOpen]);

  return (
    <Fragment>
      <Dialog
        key={props.id_review}
        TransitionComponent={TransitionCustom}
        keepMounted
        scroll="body"
        fullScreen={width === "xs" || width === "sm"}
        maxWidth="md"
        open={props.stateOpen === props.id_review}
        onClose={() => handleClick(0)}
      >
        <DialogTitle classes={{ root: classes.dialogTitle }}>
          <IconButton aria-label="Close" onClick={() => handleClick(0)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {!!roomReview ? (
            <Grid container spacing={4} justify="center" alignContent="center">
              <Grid item xs={12} sm={12} md={4}>
                <Card className={classes.card} elevation={0}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                        room === null ? <SimpleLoader /> : room.image
                      }`}
                      title="Ảnh phòng"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography component="p" className={classes.nameCity}>
                        {room === null ? <SimpleLoader /> : room.room_type_text}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="h2"
                        className={classes.nameRoom}
                      >
                        {room === null ? <SimpleLoader /> : room.name}
                      </Typography>
                      <Typography component="p" className={classes.priceRoom}>
                        {`${formatMoney(
                          room === null ? <SimpleLoader /> : room.price_day,
                          0
                        )}`}
                        đ <sub>/ngày</sub> -
                        {`${formatMoney(
                          room === null ? <SimpleLoader /> : room.price_hour,
                          0
                        )}`}
                        đ <sub>/4 giờ</sub>
                      </Typography>
                      <div></div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item xs={12} sm={12} md={7}>
                <Typography variant="h6">Nhận xét về phòng</Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Rất mong sự phản hồi của bạn "
                  multiline
                  disabled
                  rows="6"
                  rowsMax="6"
                  fullWidth
                  defaultValue={roomReview!.comment}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
                <Grid container>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.title}
                    >
                      Sạch sẽ
                    </Typography>
                    <StarRatings
                      rating={roomReview!.cleanliness} //index rating
                      starDimension="28px"
                      starSpacing="1px"
                      starRatedColor="#46AFCC"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.title}
                    >
                      Chất lượng phòng
                    </Typography>
                    <StarRatings
                      rating={roomReview!.quality} //index rating
                      starDimension="28px"
                      starSpacing="1px"
                      starRatedColor="#46AFCC"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography variant="h5" className={classes.title}>
                      Dịch vụ phòng
                    </Typography>

                    <StarRatings
                      rating={roomReview!.service} //index rating
                      starDimension="28px"
                      starSpacing="1px"
                      starRatedColor="#46AFCC"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography variant="h5" className={classes.title}>
                      Giá trị
                    </Typography>

                    <StarRatings
                      rating={roomReview!.valuable} //index rating
                      starDimension="28px"
                      starSpacing="1px"
                      starRatedColor="#46AFCC"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography variant="h5" className={classes.title}>
                      Tổng quan phòng
                    </Typography>

                    <StarRatings
                      rating={roomReview!.avg_rating} //index rating
                      starDimension="28px"
                      starSpacing="1px"
                      starRatedColor="#46AFCC"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <Typography variant="h5" className={classes.title}>
                      Bạn có thích phòng này hay không
                    </Typography>
                    <div>
                      <FormControl>
                        <RadioGroup
                          name="like"
                          value={roomReview!.like.toString()}
                          classes={{
                            root: classes.radio
                          }}
                        >
                          <FormControlLabel
                            value="1"
                            control={
                              <Radio
                                checkedIcon={
                                  <SentimentVerySatisfied color="error" />
                                }
                              />
                            }
                            label="Hài lòng"
                          />
                          <FormControlLabel
                            value="0"
                            control={
                              <Radio
                                checkedIcon={
                                  <SentimentVeryDissatisfied color="error" />
                                }
                              />
                            }
                            label="Không hài lòng"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <SimpleLoader />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogBookingDetails;
