import React, {
  ComponentType,
  useEffect,
  Fragment,
  useContext,
  useState,
  ChangeEvent
} from "react";
import NavTop from "@/components/ToolBar/NavTop";
import { compose } from "recompose";
import {
  createStyles,
  withStyles,
  Paper,
  Typography,
  SnackbarContent,
  Snackbar,
  Theme
} from "@material-ui/core";
import { ThemeCustom } from "@/components/Theme/Theme";
import Footer from "@/layouts/Main/Footer";
import { RouteChildrenProps, match } from "react-router";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import qs from "query-string";
import Grid from "@material-ui/core/Grid";
import { formatMoney } from "@/utils/mixins";
import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";
import { axios } from "@/utils/axiosInstance";
import { AxiosRes } from "@/types/Requests/ResponseTemplate";
import { AxiosError } from "axios";
import Location from "@material-ui/icons/LocationOnOutlined";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import { BookingIndexRes } from "@/types/Requests/Booking/BookingResponses";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import {
  ReasonList,
  ReasonCancelReq
} from "@/types/Requests/ReviewRoom/ReviewResponse";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

interface IProps extends RouteChildrenProps {
  classes: any;
  match: match<any>;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
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
    boxPadding: {
      padding: "40px 30px"
    },
    boxReason: {
      border: "1px solid #eee",
      borderRadius: 8,
      padding: 16,
      position: "sticky",
      top: "10%",
      left: "auto",
      right: 0
    },
    PaperDatePick: {
      border: "1px solid #e4e4e4",
      borderRadius: 4
    },
    formControl: {
      height: 50,
      width: "100%",
      backgroundColor: "#ffffff"
    },
    menuSelect: {
      maxHeight: "calc(100% - 60%)"
    },
    inputOutline: {
      border: "none"
    },
    buttonSubmit: {
      margin: "16px 0",
      color: "#fff"
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

const PageCancelBooking: ComponentType<IProps> = (props: IProps) => {
  const { classes, match } = props;
  const { history, location } = useContext<IGlobalContext>(GlobalContext);
  const [infoBooking, setInfoBooking] = useState<BookingIndexRes | null>(null);
  const [reasonList, setReasonList] = useState<any>(null);
  const [idReason, setIdReason] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [openSnackRe, setOpenSnackRe] = useState<boolean>(false);

  useEffect(() => {
    let id = parseInt(match.params.id);
    let token = qs.parse(location.search!);
    // if (isNaN(id)) history.push('/');
    axios
      .get(
        `bookings/${id}?include=room.details,room.media,cancel${
          token.token === undefined ? "" : `&token=${token.token}`
        }`
      )
      .then((res: AxiosRes<BookingIndexRes>) => {
        setInfoBooking(res.data.data);
      })
      .catch((err: AxiosError) => {
        const changeError = (mess: string) => {
          history.push("/error");
          setTimeout(() => {
            alert(mess);
          }, 1000);
          // window.location.replace('/');
        };

        switch (err.response!.status) {
          case 401: {
            changeError("Bạn cần đăng nhập để thực hiện chức năng này");
            break;
          }
          case 422: {
            changeError(err.response!.data.data.content);
            break;
          }
          // default: {
          //   window.location.replace('/');
          // }
        }
      });

    axios
      .get("bookings/cancel-reason-list")
      .then((res: AxiosRes<any>) => {
        setReasonList(res.data);
      })
      .catch(error => {});
  }, []);

  const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setIdReason(parseInt(event.target.value));
  };

  const itemsReason = _.map(reasonList, (o, i) => {
    return (
      <MenuItem key={i} value={o.id}>
        {o.value}
      </MenuItem>
    );
  });

  const handleSubmit = () => {
    let id = parseInt(match.params.id);
    let token = qs.parse(location.search!);
    if (isNaN(id)) history.push("/");

    const data: ReasonCancelReq = {
      note: comment,
      code: idReason
    };
    axios
      .post(`bookings/cancel-booking/${id}?token=${token.token}`, data)
      .then(res => {
        setOpenSnackRe(!openSnackRe);
        setTimeout(() => {
          alert("Trở về trang chủ để tiếp tục đặt phòng");
          window.location.replace("/");
        }, 1000);
      })
      .catch(error => {});
  };

  return (
    <Fragment>
      <NavTop />
      {infoBooking ? (
        <Paper square className={classes.boxPadding}>
          <Grid container justify="center" alignContent="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                Hủy đặt phòng
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Grid container spacing={2} direction="row">
                <Grid item xs={12}>
                  <Typography className={classes.titleMargin}>
                    <span className={classes.titleDetails}>
                      Thông tin Phòng
                    </span>
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4} lg={4}>
                      <img
                        alt="image room"
                        src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${infoBooking.room.data.media.data[0].image}`}
                        className={classes.imageRoom}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      md={7}
                      lg={6}
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="flex-start"
                    >
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="h6">
                            {infoBooking.name}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.rowMargin}>
                          <StarRatings
                            rating={infoBooking.room.data.avg_rating} //index rating
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="#FFC412"
                          />
                          <span className={classes.spanViews}>
                            {infoBooking.room.data.total_review} views
                          </span>
                        </Grid>
                        <Grid item className={classes.rowMargin}>
                          <span className={classes.txtAddress}>
                            <Location className={classes.iconLocation} />
                            {infoBooking.room.data.details.data[0].name}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid container direction="row">
                        <Grid item className={classes.rowMargin}>
                          {infoBooking.status_txt === "" ? (
                            ""
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              className={classes.btStatus}
                            >
                              {infoBooking.status_txt}
                            </Button>
                          )}
                          {infoBooking.coupon_txt === "" ? (
                            ""
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              className={classes.btStatus}
                            >
                              {infoBooking.coupon_txt}
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.titleMargin}>
                    <span className={classes.titleDetails}>
                      Thông tin khách hàng
                    </span>
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Khách đặt:{" "}
                        </span>
                        <span>{infoBooking.name}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          SĐT khách đặt:{" "}
                        </span>
                        <span>{infoBooking.phone}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Email khách đặt:{" "}
                        </span>
                        <span>{infoBooking.email}</span>
                      </Typography>
                      <Hidden smUp>
                        <Divider />
                      </Hidden>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Khách nhận:{" "}
                        </span>
                        <span>{infoBooking.name_received}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          SĐT Khách nhận:{" "}
                        </span>
                        <span>{infoBooking.phone_received}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Email khách nhận:{" "}
                        </span>
                        <span>{infoBooking.email_received}</span>
                      </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Ghi chú:{" "}
                        </span>
                        <span>{infoBooking.note}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.titleMargin}>
                    <span className={classes.titleDetails}>
                      Thông tin thanh toán
                    </span>
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Ngày nhận phòng:{" "}
                        </span>
                        <span>
                          {moment(infoBooking.checkin).format(
                            "DD-MM-YYYY, HH:mm A"
                          )}
                        </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Ngày trả phòng:{" "}
                        </span>
                        <span>
                          {moment(infoBooking.checkout).format(
                            "DD-MM-YYYY, HH:mm A"
                          )}
                        </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Phương thức thanh toán:{" "}
                        </span>
                        <span>{infoBooking.payment_method_txt}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Trạng thái thanh toán:{" "}
                        </span>
                        <span>{infoBooking.payment_status_txt}</span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Số khách :{" "}
                        </span>
                        <span>{infoBooking.number_of_guests}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Giá gốc:{" "}
                        </span>
                        <span>{formatMoney(infoBooking.price_original)} </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Tiền dịch vụ:{" "}
                        </span>
                        <span>{formatMoney(infoBooking.service_fee)} </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Giá giảm :{" "}
                        </span>
                        <span>{formatMoney(infoBooking.price_discount)} </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Phụ phí :{" "}
                        </span>
                        <span>{formatMoney(infoBooking.additional_fee)} </span>
                      </Typography>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Mã giảm giá :{" "}
                        </span>
                        <span>{formatMoney(infoBooking.coupon_discount)} </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.rowMargin}>
                        <span className={classes.contentDetails}>
                          Trạng thái đơn đặt phòng :{" "}
                        </span>
                        <span style={{ fontWeight: 700 }}>
                          {infoBooking.total_txt}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider className={classes.rowMargin} />
                      <Typography variant="h5" align="right">
                        Tổng tiền: {formatMoney(infoBooking.total_fee)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={1}>
              {/*khoang cach giua hai cot*/}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper elevation={0} className={classes.boxReason}>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6">Lý do hủy phòng</Typography>
                  <Paper square elevation={0} className={classes.PaperDatePick}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      disabled={infoBooking.status === 5}
                    >
                      <Select
                        MenuProps={{
                          classes: { paper: classes.menuSelect }
                        }}
                        // displayEmpty
                        value={
                          infoBooking.status === 5
                            ? infoBooking.cancel.data[0].code
                            : idReason
                        }
                        onChange={handleChangeSelect}
                        input={
                          <OutlinedInput
                            notched={false}
                            labelWidth={0}
                            name="time"
                            id="outlined-time-simple"
                            classes={{ notchedOutline: classes.inputOutline }}
                          />
                        }
                      >
                        {itemsReason}
                      </Select>
                    </FormControl>
                  </Paper>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ margin: "20px 0 0" }}
                  >
                    Hãy cho chúng tôi biết về lý do hủy phòng của bạn để có thể
                    hỗ trợ dịch vụ tốt hơn
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Lý do hủy phòng"
                    multiline
                    required={idReason === 2}
                    disabled={infoBooking.status === 5}
                    rows="6"
                    rowsMax="6"
                    fullWidth
                    defaultValue={
                      infoBooking.status === 5
                        ? infoBooking.cancel.data[0].note
                        : ""
                    }
                    onChange={e => setComment(e.target.value)}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: infoBooking.status === 5
                    }}
                  />
                  <Typography variant="subtitle2" color="textSecondary">
                    Nếu chọn 'Lý do khác' xin vui lòng cho chúng tôi biết chi
                    tiết lý do bạn hủy đơn đặt phòng
                  </Typography>
                  <div style={{ textAlign: "center" }}>
                    {infoBooking.status === 5 ? (
                      <Button
                        variant="contained"
                        disabled={true}
                        color="secondary"
                        className={classes.buttonSubmit}
                      >
                        Đã hủy đơn
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonSubmit}
                        disabled={idReason === 0}
                        type="submit"
                      >
                        Xác nhận hủy đơn
                      </Button>
                    )}
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <SimpleLoader />
      )}
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openSnackRe}
        autoHideDuration={5000}
        onClose={() => {
          setOpenSnackRe(!openSnackRe);
        }}
      >
        <SnackbarContent
          className={classes.snackContent}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={classes.iconSnackContent} />
              Hủy đặt phòng thành công!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => {
                setOpenSnackRe(!openSnackRe);
              }}
            >
              <CloseIcon className={classes.iconClose} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </Fragment>
  );
};

export default PageCancelBooking;
