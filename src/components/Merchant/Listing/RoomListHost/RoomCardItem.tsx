import { IMAGE_STORAGE_LG } from "@/utils/store/global";
import {
  faBath,
  faBed,
  faDoorOpen,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createStyles,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Link,
  Paper,
  Theme
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import numeral from "numeral";
import React, { FC, Fragment } from "react";
import theme from "@/components/Theme/Theme";
import { compose } from "recompose";
import house from "@/assets/house.svg";
import rentType from "@/assets/rentType.svg";
import flash from "@/assets/flash.svg";
import flashWhite from "@/assets/flashWhite.svg";
import policy from "@/assets/policy.svg";
import camera from "@/assets/camera.svg";
import verified from "@/assets/verified.svg";
import { Box } from "mdi-material-ui";
interface IProps {
  classes?: any;
  room: any;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 400,
    fontSize: 14,
    border: "1px solid #dce0e0"
  }
}))(Tooltip);

const styles: any = () =>
  createStyles({
    root: {
      marginBottom: 24
    },
    paper: {
      padding: "16px",
      border: "1px solid #eeeeee",
      borderRadius: "25px !important",
      boxShadow: "0px 12px 22px rgba(0, 0, 0, 0.0968914)"
    },
    title: {
      fontWeight: 600
    },
    content: {
      height: "100%",
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    },
    img: {
      display: "block",
      width: 140,
      objectFit: "cover",
      border: "1px solid #efefef",
      borderRadius: "10px"
    },
    imgDefault: {
      width: 140,
      height: 40,
      margin: "auto"
    },
    widthImg: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        marginBottom: 8,
        maxHeight: 94
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: 160,
        maxHeight: 105
      },
      [theme.breakpoints.up("sm")]: {
        maxHeight: 117
      }
    },
    wrapperImage: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        maxWidth: 140
      },
      [theme.breakpoints.down("sm")]: {
        height: 117
      },
      [theme.breakpoints.down("xs")]: {
        height: 94
      },
      backgroundColor: "#3d5c5c",
      border: "1px solid #ffffff",
      borderRadius: "10px"
    },
    roomName: {
      fontSize: "1.2rem",
      display: "inline-block",
      color: "#48465b",
      fontWeight: 800,
      alignItems: "center",
      marginRight: "0.5rem",
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem"
      }
    },
    price: {
      display: "flex",
      justifyContent: "flex-start",
      position: "relative",
      top: "-10px"
    },
    details: {
      display: "flex",
      justifyContent: "flex-start",
      margin: "5px 0"
    },
    priceDay: {
      display: "flex",
      color: "#767676 !important",
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        fontSize: 12
      }
    },
    priceAll: {
      display: "flex",
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        fontSize: 12
      }
    },
    link: {
      color: "#484848"
    },
    infoRoomName: {
      display: "flex",
      margin: "5px 0"
    },
    vertifiredMdDown: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        alignItems: "flex-start"
      }
    },
    iconVerified: {
      width: "23px",
      float: "inherit",
      position: "relative",
      top: 5,
      left: 5
    },
    spanIcon: {
      display: "flex",
      alignItems: "center"
    },
    marginLabel: {
      margin: "16px 0 !important"
    },
    wrapperIcon: {
      maxWidth: "160px !important"
    },
    IconButton: {
      backgroundColor: "#E1E8F7",
      color: "#3E93F8",
      borderRadius: "50%",
      padding: 8,
      marginLeft: 8,
      "&:hover": {
        background: "#3E93F8",
        color: "#fff"
      }
    },
    IconImage: {
      backgroundColor: "#E1E8F7",
      color: "#3E93F8",
      padding: 8,
      marginLeft: 8,
      "&:hover": {
        background: "#3E93F8",
        color: "#fff"
      }
    },
    sizeImage: {
      width: "1.5rem",
      height: "1.5rem"
    },
    customIcon: {
      color: "#484848"
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    sizeButton: {
      [theme.breakpoints.down("md")]: {
        width: "0.9rem",
        height: "0.9rem"
      }
    },
    process: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      [theme.breakpoints.down("md")]: {
        justifyContent: "flex-start"
      }
    },
    imgDetail: {
      height: 45,
      [theme.breakpoints.down("md")]: {
        height: 40
      },
      [theme.breakpoints.down("sm")]: {
        height: 35
      },
      [theme.breakpoints.down("xs")]: {
        height: 30
      }
    },
    marginProcess: {
      marginRight: "10px"
    },
    IconDetail: {
      color: "lightgray"
    },
    subLabel: {
      fontWeight: 700,
      color: "#484848 !important",
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        fontSize: 13
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12
      }
    },
    btnShowSmUp: {
      display: "flex",
      alignItems: "start",
      justifyContent: "flex-end"
    },
    percent: {
      fontWeight: 600
    }
  });
const RoomCardItem: FC<IProps> = props => {
  const { classes } = props;
  const { room } = props;
  const BorderLinearProgress = withStyles({
    root: {
      height: 6,
      width: 300,
      backgroundColor: "#ededed",
      borderRadius: 30
    },
    bar: {
      borderRadius: 30,
      backgroundColor: "#43cab8"
    }
  })(LinearProgress);
  const openUpdateRoom = (
    room_id: number,
    percent_longterm: number,
    lease_type: number,
    percent_shortterm: number
  ) => {
    // if (lease_type !== 1) {
    //   if (percent_longterm == 100) {
    //     window.open(`/host/update-listing/${room_id}`, `_blank`);
    //   } else {
    //     window.open(`/host/create-listing/${room_id}/process`, `_blank`);
    //   }
    // } else if (lease_type == 1) {
    //   if (percent_shortterm == 100) {
    //     window.open(`/host/update-listing/${room_id}`, `_blank`);
    //   } else {
    //     window.open(`/host/create-listing/${room_id}/process`, `_blank`);
    //   }
    // }
  };
  const openPreviewRoomShortTerm = (room_id: number, status: number) => {
    // status != 1
    //   ? window.open(`/preview-room/${room_id}`, `_blank`)
    //   : window.open(`/room/${room_id}`, `_blank`);
  };
  const openPreviewRoomLongTerm = (room_id: number, status: number) => {
    // status != 1
    //   ? window.open(`/preview-long-term-room/${room_id}`, `_blank`)
    //   : window.open(`/long-term-room/${room_id}`, `_blank`);
  };

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.root}
      >
        <Grid item xs={11} sm={11} md={10} lg={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  {room.media && room.media.data.length ? (
                    <Grid
                      item
                      xs={7}
                      sm={3}
                      md={3}
                      lg={2}
                      className={classes.widthImg}
                    >
                      <img
                        className={classes.img}
                        src={IMAGE_STORAGE_LG + room.media.data[0].image}
                        alt="Westay - Homestay cho người việt"
                      />
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={7}
                      sm={3}
                      md={3}
                      lg={2}
                      className={classes.widthImg}
                    >
                      <Grid className={classes.wrapperImage}>
                        <img
                          src={camera}
                          alt="Camera"
                          className={classes.imgDefault}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Hidden smUp>
                    <Grid item xs={5} className={classes.btnShowSmUp}>
                      <Grid item>
                        <Tooltip
                          title="Cập nhật phòng"
                          placement="bottom"
                          classes={{ tooltip: "tooltip" }}
                        >
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="Edit"
                            // onClick={() =>
                            //   openUpdateRoom(
                            //     room.id,
                            //     room.percent,
                            //     room.lease_type,
                            //     room.short_term_room.percent
                            //   )
                            // }
                          >
                            <EditIcon className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={9} md={9} lg={10}>
                    <Grid className={classes.content}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={10}
                          className={classes.infoRoomName}
                        >
                          <span>
                            <Link
                              href={`/room/${room.id}`}
                              className={classes.roomName}
                              target="_blank"
                            >
                              {room.details
                                ? room.details.data[0].name
                                : "Chưa có tên căn hộ"}
                              {room.status === 1 ? (
                                <Tooltip
                                  title={`Verified`}
                                  placement="bottom"
                                  classes={{ tooltip: "tooltip" }}
                                >
                                  <img
                                    src={verified}
                                    alt="Verified"
                                    className={classes.iconVerified}
                                  />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </Link>
                          </span>
                        </Grid>
                        <Hidden xsDown>
                          <Grid container item xs={2} justify="flex-end">
                            <Grid item>
                              <Tooltip
                                title="Cập nhật phòng"
                                placement="bottom"
                                classes={{ tooltip: "tooltip" }}
                              >
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="Edit"
                                  // onClick={() =>
                                  //   openUpdateRoom(
                                  //     room.id,
                                  //     room.percent,
                                  //     room.lease_type,
                                  //     room.short_term_room.percent
                                  //   )
                                  // }
                                >
                                  <EditIcon className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Hidden>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid
                          container
                          item
                          xs={12}
                          sm={12}
                          lg={10}
                          spacing={8}
                        >
                          <Grid
                            item
                            xs={6}
                            sm={3}
                            lg={6}
                            xl={4}
                            className={classes.wrapperIcon}
                          >
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faDoorOpen}
                                ></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography className={classes.priceDay}>
                                  {room.number_room} phòng ngủ
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sm={3}
                            lg={6}
                            xl={4}
                            className={classes.wrapperIcon}
                          >
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faUserFriends}
                                ></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography className={classes.priceDay}>
                                  {room.max_guest + room.max_additional_guest}{" "}
                                  khách
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sm={3}
                            lg={6}
                            xl={4}
                            className={classes.wrapperIcon}
                          >
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBed}
                                ></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography className={classes.priceDay}>
                                  {room.number_bed} giường
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sm={3}
                            lg={6}
                            xl={4}
                            className={classes.wrapperIcon}
                          >
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBath}
                                ></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography className={classes.priceDay}>
                                  {room.bathroom} phòng tắm
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          lg={8}
                          className={classes.infoRoomName}
                        >
                          {room.rent_type === 3 ? (
                            <Typography className={classes.priceAll}>
                              <span>
                                &nbsp;
                                {numeral(room.price_day).format("0,0")} vnđ/
                                ngày &nbsp; &#8226;
                              </span>

                              <span>
                                &nbsp;
                                {numeral(room.price_hour).format("0,0")} vnđ/ 4
                                giờ
                              </span>
                            </Typography>
                          ) : (
                            ""
                          )}
                          {room.rent_type === 2 ? (
                            <Typography className={classes.priceAll}>
                              <span>
                                &nbsp;
                                {numeral(room.price_day).format("0,0")} vnđ/
                                ngày
                              </span>
                            </Typography>
                          ) : (
                            ""
                          )}
                          {room.rent_type === 1 ? (
                            <Typography
                              variant="body1"
                              className={classes.priceAll}
                            >
                              <span>
                                &nbsp;
                                {numeral(room.price_hour).format("0,0")} vnđ/ 4
                                giờ
                              </span>
                            </Typography>
                          ) : (
                            ""
                          )}
                        </Grid>
                        {room.percent < 100 ? (
                          <Grid container item xs={12} lg={4}>
                            <Grid item xs={12} className={classes.process}>
                              <BorderLinearProgress
                                className={classes.marginProcess}
                                variant="determinate"
                                color="secondary"
                                value={room.percent}
                              />
                              <span className={classes.percent}>
                                {" "}
                                {room.percent}%
                              </span>
                            </Grid>
                          </Grid>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.details}>
              <Grid container spacing={8}>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={12}
                      lg={3}
                      className={classes.maxWidthIcon}
                    >
                      <img
                        src={house}
                        alt="House"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid
                      className={classes.nameIcon}
                      item
                      xs={8}
                      sm={9}
                      lg={9}
                      md={12}
                    >
                      <Typography className={classes.priceDay}>
                        Loại phòng
                      </Typography>
                      <Typography className={classes.subLabel}>
                        {room.room_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={12}
                      lg={3}
                      className={classes.maxWidthIcon}
                    >
                      <img
                        src={rentType}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid
                      className={classes.nameIcon}
                      item
                      xs={8}
                      sm={9}
                      lg={9}
                      md={12}
                    >
                      <Typography className={classes.priceDay}>
                        Ngắn hạn
                      </Typography>

                      <Typography className={classes.subLabel}>
                        {room.rent_type === 3
                          ? "Ngày và giờ"
                          : room.rent_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={12}
                      lg={3}
                      className={classes.maxWidthIcon}
                    >
                      <img
                        src={room.instant_book === 1 ? flash : flashWhite}
                        alt="Flash"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid
                      className={classes.nameIcon}
                      item
                      xs={8}
                      sm={9}
                      lg={9}
                      md={12}
                    >
                      <Typography className={classes.priceDay}>
                        Chính sách hủy
                      </Typography>
                      <Typography className={classes.subLabel}>
                        {room.instant_book_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={12}
                      lg={3}
                      className={classes.maxWidthIcon}
                    >
                      <img
                        src={policy}
                        alt="Policy"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid
                      className={classes.nameIcon}
                      item
                      xs={8}
                      sm={9}
                      lg={9}
                      md={12}
                    >
                      <Typography className={classes.priceDay}>
                        Chính sách
                      </Typography>
                      <Typography className={classes.subLabel}>
                        <Box fontWeight={600}>
                          {room.settings.no_booking_cancel === 1
                            ? "Stric"
                            : "Flexible"}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default compose<IProps, any>(withStyles(styles))(RoomCardItem);
