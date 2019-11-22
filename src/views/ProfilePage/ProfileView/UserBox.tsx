import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import React, {
  ComponentType,
  useState,
  useEffect,
  Fragment,
  ChangeEvent,
  useContext,
  memo,
  useMemo
} from "react";
import { compose } from "recompose";

import Grid from "@material-ui/core/Grid/Grid";

import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/Typography";
import "@/styles/date-picker.scss";

import _ from "lodash";

import medalCertified from "@/assets/medalCertified.svg";
import verified from "@/assets/verified.svg";
import review from "@/assets/review.svg";

import HomeIcon from "@material-ui/icons/HomeRounded";

import {
  IProfileViewContext,
  ProfileViewContext
} from "@/store/context/Profile/ProfileViewContext";
import { Hidden } from "@material-ui/core/es";

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    boxPadding: {
      height: "100%",
      [theme!.breakpoints!.up!("md")]: {
        padding: "24px !important",
        border: "1px solid #e4e4e4 !important"
      },
      borderRadius: "4px !important"
    },
    wrapContent: {
      display: "block",
      width: "100%"
    },
    avatar: {
      position: "relative",
      width: 90,
      height: 90,
      [theme!.breakpoints!.down!("xs")]: {
        width: 70,
        height: 70
      },
      display: "inline-block"
    },
    imgAvatar: {
      width: "100%",
      height: "inherit",
      objectFit: "cover",
      borderRadius: "50%"
    },
    userName: {
      fontSize: 24,
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: 20
      },
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: 16
      },
      fontWeight: 700,
      lineHeight: "1.125em",
      color: "#484848"
    },
    address: {
      color: "#999",
      marginTop: 6
    },
    imgCertified: {
      width: 30,
      height: 30,
      marginRight: 8,
      [theme!.breakpoints!.down!("xs")]: {
        width: 24,
        height: 24
      }
    },
    homeCertified: {
      color: "#248489",
      width: 30,
      height: 30,
      marginRight: 8,
      [theme!.breakpoints!.down!("xs")]: {
        width: 24,
        height: 24
      }
    },
    boxName: {
      width: "100%",
      textAlign: "center"
    },
    divider: {
      marginTop: 24,
      marginBottom: 24
    },
    badge: {
      display: "flex",
      alignItems: "center",
      margin: "8px 0"
    },
    text: {
      fontSize: "16px"
    }
  });

const UserBox: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const { state, dispatch } = useContext<IProfileViewContext>(
    ProfileViewContext
  );
  const { profile, userRooms } = state;

  const [totalReview, setTotalReview] = useState(0);

  useEffect(() => {
    if (userRooms) {
      userRooms!.map(room => {
        setTotalReview(totalReview => totalReview + room.total_review);
      });
    }
  }, [userRooms]);

  return (
    <Fragment>
      <Grid container className={classes.boxPadding}>
        <Grid className={classes.wrapContent}>
          <Grid item className={classes.boxName}>
            {profile!.avatar_url ? (
              <div className={classes.avatar}>
                <img
                  alt="Avatar"
                  src={profile!.avatar_url}
                  className={classes.imgAvatar}
                />
              </div>
            ) : (
              ""
            )}
            <Typography className={classes.userName}>
              {profile!.name}
            </Typography>
            {/* <Typography className={classes.address}>
                {profile!.district != "Không xác định"
                  ? profile!.district + ","
                  : ""}{" "}
                {profile!.city != "Không xác định" ? profile!.city + "," : ""}{" "}
                Việt Nam
              </Typography> */}
          </Grid>
          <Divider className={classes.divider} />
          <Grid item className={classes.boxName}>
            <div className={classes.badge}>
              <img src={verified} className={classes.imgCertified} />
              <Typography className={classes.text}>Đã xác minh</Typography>
            </div>
            <div className={classes.badge}>
              <img src={review} className={classes.imgCertified} />
              <Typography className={classes.text}>
                {" "}
                {totalReview} Đánh giá
              </Typography>
            </div>
            <div className={classes.badge}>
              <HomeIcon className={classes.homeCertified} />
              <Typography className={classes.text}>
                {userRooms ? userRooms.length : ""} chỗ ở
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Hidden lgUp>
          <Divider className={classes.divider} />
        </Hidden>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(UserBox);
