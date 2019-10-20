import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import LocationHomeMap from "@/views/DetailsPage/LocationHomeMap";
import React, { ComponentType, Fragment, useContext, useState } from "react";
import { compose, withProps } from "recompose";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar";
import avatarDemo from "@/assets/default_avatar.png";
import {
  IRoomDetailsContext,
  RoomDetailsContext
} from "@/store/context/Room/RoomDetailsContext";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/vi_VN";
// @ts-ignore
import StarRatings from "react-star-ratings";
import "rc-pagination/assets/index.css";
import moment from "moment";

interface IProps {
  classes?: any;
  center?: Object;
  zoom?: number;
  review: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    rowMargin: {
      margin: "10px 0",
      padding: "12px 10px",
      [theme!.breakpoints!.down!("xs")]: {
        padding: "10px 0px"
      },
      borderTop: "1px solid #e0e0e0"
    },
    rowMarginBorderTop: {
      margin: "10px 0",
      borderTop: "1px solid #e0e0e0",
      padding: "15px 0px"
    },
    rowMargin2: {
      margin: "10px 0"
    },
    titleHighlight: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "1.375em",
      color: "#484848"
    },
    boxMark: {
      backgroundColor: "#fff",
      borderRadius: "50%",
      height: 80,
      width: 80,
      overflow: "hidden",
      position: "relative",
      margin: "0 auto",
      border: "double 9px transparent",
      backgroundImage:
        "linear-gradient(white, white), radial-gradient(circle at top left, #74ebd5,#acb6e5 )",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box"
    },
    Mark: {
      backgroundColor: "#1ba0e2",
      backgroundImage: "linear-gradient(to bottom, #74ebd5, #acb6e5)",
      borderRadius: "50%",
      width: "90%",
      height: "90%",
      textAlign: "center",
      position: "absolute",
      left: "50%",
      top: "50%",
      WebkitTransform: "translateX(-50%) translateY(-50%)",
      MozTransform: "translateX(-50%) translateY(-50%)",
      transform: "translateX(-50%) translateY(-50%)"
    },
    TypoMark: {
      color: "#fff",
      fontSize: "2.5vw",
      fontWeight: 500,
      textAlign: "center",
      position: "absolute",
      left: "50%",
      top: "50%",
      WebkitTransform: "translateX(-50%) translateY(-50%)",
      MozTransform: "translateX(-50%) translateY(-50%)",
      transform: "translateX(-50%) translateY(-50%)",
      [theme!.breakpoints!.down!("md")]: {
        fontSize: "3.5vw"
      },
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: "4.5vw"
      },
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: "8vw"
      }
    },
    status: {
      color: "#004fa2",
      fontWeight: 500,
      textAlign: "center",
      fontSize: "1.5vw",
      [theme!.breakpoints!.down!("md")]: {
        fontSize: "2vw"
      },
      [theme!.breakpoints!.down!("sm")]: {
        fontSize: "2.5vw",
        paddingTop: 5
      },
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: "4.5vw",
        paddingTop: 5
      }
    },
    titleRating: {
      textAlign: "right",
      [theme!.breakpoints!.down!("xs")]: {
        textAlign: "left"
      }
    },
    valueRating: {
      textAlign: "right"
    },
    titleReview: {
      fontSize: 18,
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: 16.5
      },
      fontWeight: 500,
      lineHeight: "1.375em",
      color: "#484848",
      padding: "4px 0"
    },
    comments: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "1.375em",
      color: "#7E8082",
      padding: "4px 0"
    },
    avatar: {
      width: 60,
      height: 60
    },
    nameUser: {
      fontSize: 17
    },
    boxPagination: {
      display: "flex",
      justifyContent: "center"
    },
    boxMap: {
      height: 350,
      margin: "10px 0",
      borderRadius: 5,
      overflow: "hidden",
      border: "1px solid #e0e0e0"
    },
    paddingXS: {
      [theme!.breakpoints!.down!("xs")]: {
        width: "95%",
        margin: "0 auto"
      }
    },
    starRatings: {
      marginLeft: 12
    },
    seeMore: {
      color: '#484848',
      textDecoration: 'none',
      fontWeight: 700
    }
  });

const Reviews: ComponentType<IProps> = (props: IProps) => {
  const { classes, review } = props;
  
  const [data] = useState<any[]>(review);
  const [limit, setLimit] = useState(5);
  

  const onLoadMore = () => {
    setLimit(limit => limit + 5);
  };

  
  
  // console.log(newData)
  const renderListComment = data.slice(0, limit).map((todo, index) => {
    return (
      <Grid container className={classes.rowMarginBorderTop} key={index}>
        <Grid item container xs={12}>
          <Grid item xs={3} sm={2}>
            <Avatar
              alt="Avatar"
              src={
                todo.user.data.avatar !== ""
                  ? todo.user.data.avatar_url
                  : ""
              }
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography variant="h6" className={classes.nameUser}>
              {todo!.user.data.length !== 0
                ? todo!.user.data.name !== ""
                  ? todo!.user.data.name
                  : "Ẩn danh"
                : "Ẩn danh"}
              <span className={classes.starRatings}>
                <StarRatings
                  rating={todo!.avg_rating} //index rating
                  starDimension="14px"
                  starSpacing="1px"
                  starRatedColor="#ffb40b"
                />
              </span>
            </Typography>

            <Typography variant={"caption"}>
              {moment(todo.created_at).format("DD/MM/YYYY")}
            </Typography>
            <Typography className={classes.comments}>{todo.comment}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (<div>

  {data ? renderListComment : ""}
  {limit < data.length && <a href="javascript:void(0)" onClick={onLoadMore} className={classes.seeMore}>Xem thêm</a>}
  
</div>);
};

export default compose<IProps, any>(withStyles(styles))(Reviews);
