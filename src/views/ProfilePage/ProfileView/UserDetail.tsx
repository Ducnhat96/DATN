import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import React, {
  ComponentType,
  useState,
  Fragment,
  ChangeEvent,
  useContext,
  memo,
  useMemo,
  useEffect
} from "react";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/Typography";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";
import RoomHot from "@/layouts/Main/RoomHot";
import _ from "lodash";
import {
  ProfileViewContext,
  IProfileViewContext,
  getRoomMerchantById
} from "@/store/context/Profile/ProfileViewContext";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import Reviews from "./Reviews";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import totalReview from "@/views/ProfilePage/ProfileView/UserBox";
import ChatIcon from "@material-ui/icons/ChatRounded";
import facebookIcon from "@/assets/facebook-logo.svg";
import WorkIcon from "@material-ui/icons/WorkRounded";
//src/assets/facebook-logo.svg

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {},
    title: {
      margin: "0px !important",
      fontSize: "24px !important",
      fontWeight: 800,
      lineHeight: "1.25em !important",
      color: "#484848 !important"
    },
    subText: {
      display: "inline-block",
      fontSize: 16
    },
    text: {
      marginTop: 8,
      fontSize: 16
    },
    listUserRooms: {
      marginTop: 24,
      marginBottom: 0,
      width: "100%",
      display: "block"
    },
    boxName: {
      width: "100%",
      display: "block"
    },
    divider: {
      width: "100%",
      marginTop: 32,
      marginBottom: 32
    },
    userRooms: {
      marginTop: 24,
      marginBottom: 0
    },
    description: {
      wordWrap: "break-word",
      fontSize: 16,
      lineHeight: "1.375em"
    },
    dividerDescription: {
      borderBottom: "4px solid #EBEBEB !important",
      width: 32,
      marginTop: 16,
      marginBottom: 16,
      background: "none"
    },
    imgIcon: {
      width: 20,
      height: 20,
      marginRight: 12,
      verticalAlign: "middle"
    },
    infoItem: {
      display: "flex",
      marginTop: 12
    }
  });

const UserDetail: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const { state, dispatch } = useContext<IProfileViewContext>(
    ProfileViewContext
  );
  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { profile, userRooms } = state;

  const [reviewList, setReviewList] = useState<any[]>([]);

  const settingRoomHot: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    lazyLoad: "ondemand",
    swipeToSlide: true,
    nextArrow: <NextArrowSlider />,
    touchThreshold: 100,
    prevArrow: <PrevArrowSlider />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 5000,
          touchThreshold: 100
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          autoplay: true,
          arrows: false,
          autoplaySpeed: 5000,
          touchThreshold: 100
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          touchThreshold: 100,
          arrows: false,
          centerMode: true,
          centerPadding: "25px"
        }
      }
    ]
  };

  const [totalReview, setTotalReview] = useState(0);

  useEffect(() => {
    
    if (userRooms) {
      userRooms!.map(room => {
        setTotalReview(totalReview => totalReview + room.total_review);
        // console.log(room.total_review);
      });
    }
  }, [userRooms]);

  useEffect(()=> {
    let reviewArray: any[] = [];
    userRooms!
      .map(room => room!.reviews.data)
      .map(reviews => {
        reviews.map(review => {
          reviewArray.push(review);
        });
      });
    setReviewList(reviewArray);
  }, [userRooms])

  return (
    <Fragment>
      <Grid container className={classes.wrapper}>
        <Grid item className={classes.boxName}>
          <Typography className={classes.title}>Thông tin cá nhân</Typography>
          <Typography className={classes.text}>
            Tham gia từ năm {profile!.created_at.substring(0, 4)}
          </Typography>
          {profile!.description ? (
            <Fragment>
              <Divider className={classes.dividerDescription} />
              <Typography className={classes.description}>
                {profile!.description}
              </Typography>
            </Fragment>
          ) : (
            ""
          )}
          <Divider className={classes.dividerDescription} />
          <div className={classes.extraInfo}>
            <div className={classes.infoItem}>
              <span>
                <LocationIcon className={classes.imgIcon} />
              </span>

              <Typography className={classes.subText}>
                {profile!.district != "Không xác định"
                  ? profile!.district + ","
                  : ""}{" "}
                {profile!.city != "Không xác định" ? profile!.city + "," : ""}{" "}
                Việt Nam
              </Typography>
            </div>
            {/* <div className={classes.infoItem}>
                <span>
                  <ChatIcon className={classes.imgIcon}/>
                </span>
                <Typography className={classes.subText}>Nói tiếng Anh, Tây Ban Nha</Typography>
              </div> */}
            {/* <div className={classes.infoItem}>
                <span>
                  <WorkIcon className={classes.imgIcon}/>
                </span>
                <Typography className={classes.subText}>Nghề nghiệp: Thu họ</Typography>
              </div> */}
            {/* <div className={classes.infoItem}>
                <span>
                  <img src={facebookIcon} className={classes.imgIcon} />
                </span>
                <Typography className={classes.subText}>Kết nối tài khoản</Typography>
              </div> */}
          </div>
        </Grid>

        {userRooms!.length !== 0 ? (
          <Fragment>
            <Divider className={classes.divider} />
            <Grid item className={classes.boxName}>
              <Typography className={classes.title}>Chỗ ở</Typography>
              <Grid container className={classes.listUserRooms}>
                <Slider {...settingRoomHot}>
                  {_.map(userRooms, (room, index) => (
                    <div key={index}>
                      <RoomHot room={room} />
                    </div>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          ""
        )}

        {totalReview !== 0 ? (
          <Fragment>
            <Divider className={classes.divider} />
            <Grid item className={classes.boxName}>
              <Typography className={classes.title}>Đánh giá</Typography>
              <div className={classes.userReviews}>
                {reviewList!.length > 0 ? <Reviews review={reviewList} /> : ""}
              </div>
            </Grid>
          </Fragment>
        ) : (
          ""
        )}
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(UserDetail);
