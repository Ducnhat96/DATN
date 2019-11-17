import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles, Theme } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import React, { ComponentType, useState, Fragment, useContext } from "react";
import { compose } from "recompose";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Location from "@material-ui/icons/LocationOnOutlined";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MeetingRoom from "@material-ui/icons/MeetingRoomRounded";
import LocalHotel from "@material-ui/icons/LocalHotelRounded";
import HotTub from "@material-ui/icons/HotTubRounded";
import People from "@material-ui/icons/PeopleRounded";
import Home from "@material-ui/icons/HomeRounded";
import chat from "@/assets/chat.png";
import verified from "@/assets/verified.png";
import medalCertified from "@/assets/medalCertified.svg";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
// @ts-ignore
import StarRatings from "react-star-ratings";
// @ts-ignore
import ReactHtmlParser, {
  convertNodeToElement
} from "react-html-parser";
import {
  IRoomDetailsContext,
  RoomDetailsContext
} from "@/store/context/Room/RoomDetailsContext";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import _ from "lodash";
import ContentPlaceHolder from "@/components/PlaceHolder/ContentPlaceHolder";
import Orange from "@material-ui/core/colors/orange";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { windowExist } from "@/index";
import { makeStyles } from "@material-ui/styles";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    rowMargin: {
      marginBottom: 10,
      fontWeight: 300
    },
    rowMarginStandard: {
      marginBottom: 10,
      marginTop: 10
    },
    rowMargin20: {
      margin: "20px 0"
    },
    spanViews: {
      fontSize: 10,
      color: "grey",
      paddingLeft: 5
    },
    boxName: {
      paddingRight: 20
    },
    roomName: {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 22
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 20
      },
      fontWeight: 700,
      lineHeight: "1.125em",
      color: "#484848"
    },
    txtAddress: {
      color: "#008489",
      fontSize: 14
    },
    iconLocation: {
      verticalAlign: "bottom",
      fontSize: 20
    },
    boxPaddingXS: {
      flexWrap: "nowrap",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 8px"
      }
    },
    roomAmenitiesTitle: {
      color: "#343434",
      margin: "0 5px",
      fontSize: 13,
      [theme.breakpoints.down("xs")]: {
        fontSize: 12
      }
    },
    collectionAmenities: {
      paddingLeft: 0,
      textAlign: "center"
    },
    roomAmenitiesIcon: {
      verticalAlign: "bottom",
      color: "#46afcc",
      width: 32,
      height: 32
    },
    roomPropertiesIcon: {
      verticalAlign: "bottom",
      color: Orange[500],
      width: 32,
      height: 32
    },
    avatar: {
      position: "relative",
      width: 90,
      height: 90,
      [theme.breakpoints.down("xs")]: {
        width: 70,
        height: 70
      },
      display: "inline-block",
      cursor: "pointer"
    },
    imgAvatar: {
      width: "100%",
      height: "inherit",
      objectFit: "cover",
      borderRadius: "50%"
    },
    imgCertified: {
      width: 32,
      height: 32,
      [theme.breakpoints.down("xs")]: {
        width: 24,
        height: 24
      }
    },
    infoHost: {
      position: "absolute",
      lineHeight: 0,
      bottom: 0,
      right: 0
    },
    lightTooltip: {
      border: "1px solid #e0e0e0",
      color: theme.palette.text!.primary,
      fontSize: 11,
      backgroundColor: "#fff"
    },
    arrowPopper: {
      '&[x-placement*="bottom"] $arrowArrow': {
        top: 0,
        left: 0,
        marginTop: "-0.9em",
        width: "3em",
        height: "1em",
        "&::before": {
          borderWidth: "0 1em 1em 1em",
          borderColor: `transparent transparent #e0e0e0 transparent`
        }
      },
      '&[x-placement*="top"] $arrowArrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.9em",
        width: "3em",
        height: "1em",
        "&::before": {
          borderWidth: "1em 1em 0 1em",
          borderColor: `#e0e0e0 transparent transparent transparent`
        }
      },
      '&[x-placement*="right"] $arrowArrow': {
        left: 0,
        marginLeft: "-0.9em",
        height: "3em",
        width: "1em",
        top: "30%",
        "&::before": {
          borderWidth: "1em 1em 1em 0",
          borderColor: `transparent #e0e0e0 transparent transparent`
        }
      },
      '&[x-placement*="left"] $arrowArrow': {
        right: 0,
        top: "20%",
        marginRight: "-0.9em",
        height: "3em",
        width: "1em",
        "&::before": {
          borderWidth: "1em 0 1em 1em",
          borderColor: `transparent transparent transparent #e0e0e0`
        }
      }
    },
    arrowArrow: {
      position: "absolute",
      fontSize: 7,
      width: "3em",
      height: "3em",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid"
      }
    },
    info: {
      textAlign: "center",
      padding: 4
    },
    boxHighlight: {
      border: "1px solid #e0e0e0",
      borderRadius: 4,
      boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: 24,
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        padding: 16
      }
    },
    titleHighlight: {
      fontSize: 17,
      fontWeight: 600,
      lineHeight: "1.375em",
      color: "#484848"
    },
    contentHighlight: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "1.375em",
      color: "#484848"
    },
    expansionPanelSummary: {
      display: "block"
    },
    convenientExpansionPanelSummary: {
      [theme.breakpoints.down("xs")]: {
        display: "block"
      }
    },
    RootExpansionPanelSummary: {
      padding: "0 10px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 10px"
      }
    },
    expansionPanel: {
      boxShadow: "none",
      borderTop: "1px solid #e0e0e0",
      width: "100%"
    },
    expansionPanelDetails: {
      display: "block"
    },
    headingPanel: {
      flexBasis: "25%",
      flexShrink: 0,
      fontSize: 16
    },
    des_6Line: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 7,
      WebkitBoxOrient: "vertical",
      // maxHeight: 200,
      fontWeight: 300
    },
    tagP_inHtmlPare: {
      width: "100%",
      display: "block"
    },
    button: {
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
      height: "3.0rem",
      width: "3.0rem",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f9f9f9"
      }
    },
    btnUpdate: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
      alignItems: "flex-start"
    },
    iconUpdate: {
      fontSize: 18
    },
    roomId: {
      marginTop: 10,
      fontSize: "16px",
      fontWeight: 300
    },
    containerAmenities: {
      justifyContent: "space-around"
    }
  })
);

const BoxDetails: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const [arrowRef] = useState<any>(null);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;
  
  if (room == null) {
    return <ContentPlaceHolder />;
  }
  const description = room!.details.data[0].description;
  const space = room!.details.data[0].space;
  const note = room!.details.data[0].note;
  const transformHtmlTitle = (node: any, index: number) => {
    let validNodeIndex = index === 0 || index === 1;
    if (!validNodeIndex) {
      return null;
    }
  };
  const updateDetailsUrl = `https://merchant.westay.vn/merchant/listings/${
    room!.id
  }/detail`;
  const openUpdateDetail = () => {
    window.open(updateDetailsUrl, "_blank");
  };
  const userEvent = () => {
    if (windowExist) {
      let win = window.open(`/user/${room!.merchant.data.id}`, "_blank");
      win!.focus();
    }
  };

  return (
    <Fragment>
      <Grid container className={classes.boxPaddingXS}>
        <Grid item className={classes.boxName}>
          <Grid container>
            <Grid item xs={12}>
              {room!.details.data[0].name ? (
                <Typography className={classes.roomName}>
                  {room!.details.data[0].name}
                </Typography>
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  style={{ marginBottom: "15px" }}
                >
                  <Grid item>
                    <Typography className={classes.roomName}>
                      Cập nhật thông tin căn hộ
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip
                      TransitionComponent={Zoom}
                      TransitionProps={{ timeout: 500 }}
                      title="Cập nhật ngay"
                    >
                      <Fab
                        color="secondary"
                        aria-label="Edit"
                        onClick={openUpdateDetail}
                        className={classes.button}
                      >
                        <Icon>edit_icon</Icon>
                      </Fab>
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.roomId}>
                Mã chỗ ở: {room!.id}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.rowMarginStandard}>
              <StarRatings
                numberOfStars={room!.standard_point}
                starDimension={"20px"}
                starSpacing={"1px"}
                starEmptyColor={"#ffb40b"}
              />
            </Grid>
            <Grid item xs={12} className={classes.rowMargin}>
              <span className={classes.txtAddress}>
                <Location className={classes.iconLocation} />
                {`${room!.district.data.name}, ${room!.city.data.name}`}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        className={classNames(classes.rowMargin20, classes.containerAmenities)}
      >
        <Grid item xs={2} sm={2}>
          <div className={classes.collectionAmenities}>
            <Home className={classes.roomPropertiesIcon} />
            <div className={classes.roomAmenitiesTitle}>
              <span>{room!.room_type_txt}</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} sm={2}>
          <div className={classes.collectionAmenities}>
            <People className={classes.roomPropertiesIcon} />
            <div className={classes.roomAmenitiesTitle}>
              <span>{room!.max_guest} khách</span>
            </div>
            <div className={classes.roomAmenitiesTitle}>
              <span>
                (Tối đa {room!.max_guest + room!.max_additional_guest} khách)
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} sm={2}>
          <div className={classes.collectionAmenities}>
            <MeetingRoom className={classes.roomPropertiesIcon} />
            <div className={classes.roomAmenitiesTitle}>
              <span>{room!.number_room} phòng</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} sm={2}>
          <div className={classes.collectionAmenities}>
            <LocalHotel className={classes.roomPropertiesIcon} />
            <div className={classes.roomAmenitiesTitle}>
              <span>{room!.number_bed} giường</span>
            </div>
          </div>
        </Grid>
        {room!.bathroom > 0 ? (
          <Grid item xs={2} sm={2}>
            <div className={classes.collectionAmenities}>
              <HotTub className={classes.roomPropertiesIcon} />
              <div className={classes.roomAmenitiesTitle}>
                <span>{room!.bathroom} phòng tắm</span>
              </div>
            </div>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Grid container className={classes.rowMargin20}>
        {room!.places.data.length > 0 && room!.avg_rating > 3 ? (
          <div className={classes.boxHighlight}>
            <Typography variant={"button"} color={"textSecondary"}>
              Điểm nổi bật
            </Typography>
            <div className={classes.rowMargin20}>
              <span className={classes.titleHighlight}>
                Đánh giá của người dùng:{" "}
              </span>
              <span className={classes.contentHighlight}>
                Dựa trên sự chia sẻ từ {room!.total_review} người dùng, phòng
                này được đánh giá là {room!.avg_rating_txt}
              </span>
            </div>
            <div className={classes.rowMargin20}>
              <span className={classes.titleHighlight}>Vị trí: </span>
              <span className={classes.contentHighlight}>
                Phòng này có vị trí gần với <b>{room!.places.data.length}</b>{" "}
                địa điểm nổi bật trong khu vực
              </span>
            </div>
            <div className={classes.rowMargin20}>
              <span className={classes.titleHighlight}>Sparkling clean: </span>
              <span className={classes.contentHighlight}>
                11 recent guests have said that this home was sparkling clean.
              </span>
            </div>
            )
          </div>
        ) : (
          ""
        )}
      </Grid>
      <Grid container className={classes.rowMargin20}>
        <ExpansionPanel
          defaultExpanded
          classes={{ root: classes.expansionPanel }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              content: classes.expansionPanelSummary,
              root: classes.RootExpansionPanelSummary
            }}
          >
            <Typography
              className={classNames(
                classes.titleHighlight,
                classes.headingPanel
              )}
            >
              Thông tin căn hộ
            </Typography>
            <div className = {classes.des_6Line}>
                {ReactHtmlParser(description, {
                  transform: transformHtmlTitle
                })}
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </Grid>

      <Grid container className={classes.rowMargin20}>
        <ExpansionPanel classes={{ root: classes.expansionPanel }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              content: classes.expansionPanelSummary,
              root: classes.RootExpansionPanelSummary
            }}
          >
            <Typography
              className={classNames(
                classes.titleHighlight,
                classes.headingPanel
              )}
            >
              Không gian
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: classes.expansionPanelDetails }}
          >
            <Grid container className={classes.rowMargin}>
              {space !== null && space.length > 10 ? (
                ReactHtmlParser(space, {
                  transform: transformHtmlTitle
                })
              ) : (
                <p>
                  Không gian căn hộ hiện tại chưa có, vui lòng cập nhật ngay.
                </p>
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid container className={classes.rowMargin20}>
        <ExpansionPanel classes={{ root: classes.expansionPanel }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              content: classes.expansionPanelSummary,
              root: classes.RootExpansionPanelSummary
            }}
          >
            <Typography
              className={classNames(
                classes.titleHighlight,
                classes.headingPanel
              )}
            >
              Nội quy căn hộ
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: classes.expansionPanelDetails }}
          >
            <Grid container className={classes.rowMargin}>
              {note !== null && note.length > 10 ? (
                ReactHtmlParser(note, {
                  transform: transformHtmlTitle
                })
              ) : (
                <p>Nội quy căn hộ hiện tại chưa có, vui lòng cập nhật ngay.</p>
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid container className={classes.rowMargin20}>
        <ExpansionPanel classes={{ root: classes.expansionPanel }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              content: classes.convenientExpansionPanelSummary,
              root: classes.RootExpansionPanelSummary
            }}
          >
            <Typography
              className={classNames(
                classes.titleHighlight,
                classes.headingPanel
              )}
            >
              Tiện Nghi
            </Typography>
            {room && room!.comforts.data.length > 0 ? (
              <Grid container>
                <Grid item xs={3} sm={3}>
                  <div className={classes.collectionAmenities}>
                    <img
                      src={room!.comforts.data[0].icon}
                      // alt={room!.comforts.data[0].details.data[0].name}
                      className={classes.roomAmenitiesIcon}
                    />
                    <div className={classes.roomAmenitiesTitle}>
                      {/* <span>{room!.comforts.data[0].details.data[0].name}</span> */}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div className={classes.collectionAmenities}>
                    <img
                      src={room!.comforts.data[1].icon}
                      alt={room!.comforts.data[1].details.data[0].name}
                      className={classes.roomAmenitiesIcon}
                    />
                    <div className={classes.roomAmenitiesTitle}>
                      <span>{room!.comforts.data[1].details.data[0].name}</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div className={classes.collectionAmenities}>
                    <img
                      src={room!.comforts.data[2].icon}
                      alt={room!.comforts.data[2].details.data[0].name}
                      className={classes.roomAmenitiesIcon}
                    />
                    <div className={classes.roomAmenitiesTitle}>
                      <span>{room!.comforts.data[2].details.data[0].name}</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div className={classes.collectionAmenities}>
                    <img
                      src={room!.comforts.data[3].icon}
                      alt={room!.comforts.data[3].details.data[0].name}
                      className={classes.roomAmenitiesIcon}
                    />
                    <div className={classes.roomAmenitiesTitle}>
                      <span>{room!.comforts.data[3].details.data[0].name}</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: classes.expansionPanelDetails }}
          >
            <Grid container spacing={1} className={classes.rowMargin}>
              {room && room!.comforts.data.length > 0 ? (
                _.map(room.comforts.data, (o, i) =>
                  i > 3 ? (
                    <Fragment key={i}>
                      <Grid item xs={3} sm={2} md={1} lg={1}>
                        <img
                          src={o.icon}
                          alt={o.details.data[0].name}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid item xs={9} sm={4} md={5} lg={5}>
                        <Typography variant={"body2"}>
                          {o.details.data[0].name}
                        </Typography>
                      </Grid>
                    </Fragment>
                  ) : (
                    ""
                  )
                )
              ) : (
                <p>
                  Tiện nghi căn hộ hiện tại chưa có, vui lòng cập nhật ngay.
                </p>
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Fragment>
  );
};

export default BoxDetails;
