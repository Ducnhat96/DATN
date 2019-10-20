import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Hidden from "@material-ui/core/Hidden";
import React, {
  ComponentType,
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useContext,
  useState
} from "react";
import { compose } from "recompose";
import {
  IRoomDetailsContext,
  RoomDetailsContext
} from "@/store/context/Room/RoomDetailsContext";
import _ from "lodash";
// @ts-ignore
import Lightbox from "react-images";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import GridImageLoader from "@/components/PlaceHolder/GridImageLoader";
import imageDefault from "@/assets/image-default.jpg";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { Link } from 'react-router-dom';


interface IProps {
  classes?: any;
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    imageBig: {
      display: "block",
      position: "relative",
      float: "left",
      lineHeight: 0,
      overflow: "hidden",
      width: "50%",
      [theme!.breakpoints!.down!("sm")]: {
        width: "67%"
      },
      [theme!.breakpoints!.down!("xs")]: {
        width: "100%"
      },
      height: "auto",
      minHeight: 440,
      maxHeight: "100%",
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
      borderStyle: "solid",
      borderWidth: "0.5px 0.5px 0.5px 0",
      borderColor: "#fff"
    },
    imageSmall: {
      display: "block",
      position: "relative",
      lineHeight: 0,
      overflow: "hidden",
      width: "100%",
      height: "50%",
      maxHeight: 220,
      [theme!.breakpoints!.down!("sm")]: {
        maxHeight: 167.5
      },
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
      borderStyle: "solid",
      borderWidth: "0.5px 0.5px 0.5px 0.5px",
      borderColor: "#fff"
    },
    imageProp: {
      objectFit: "cover",
      border: 0,
      position: "relative",
      height: "-webkit-fill-available",
      display: "block",
      maxWidth: "100%",
      width: "100%",
      MozTransition: "all 0.5s",
      WebkitTransition: "all 0.5s",
      transition: "all 0.5s",
      cursor: "pointer",
      "&:hover": {
        MsTransform: "scale(1.1)" /* IE 9 */,
        WebkitTransform: "scale(1.1)" /* Safari 3-8 */,
        transform: "scale(1.1)"
      }
    },
    boxImgSmall: {
      width: "25%",
      [theme!.breakpoints!.down!("sm")]: {
        width: "33%"
      },
      float: "left"
    },
    imageDefault: {
      position: "absolute",
      width: "243px",
      padding: "10px",
      backgroundColor: "white",
      zIndex: 9,
      transform: "translate(-50%,-50%)",
      top: "50%",
      left: "50%",
      transition: "all 0.2s linear",
      border: "2px dashed #ccc",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      padding: "8px 20px",
      fontSize: "0.9375rem",
      color: "black",
      borderRadius: "0px",
      fontWeight: 700,
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&:focus": {
        backgroundColor: "transparent",
      }
    },
    iconUpload: {
      fontSize: "3.5rem"
    }
  });

const GridImage: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const [currentImage, setCurrentImage] = useState<number>(0);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const { room } = state;
  if (room == null) {
    return <GridImageLoader />;
  }

  const openLightbox = (event: MouseEvent<HTMLImageElement>, index: number) => {
    event.preventDefault();
    props.setIsOpen(true);
    setCurrentImage(index);
  };
  const closeLightbox = () => {
    setCurrentImage(0);
    props.setIsOpen(false);
  };
  const updateImageUrl = `https://merchant.westay.vn/merchant/listings/${room.id}/detail`;

  const ROOM_IMAGES = room
    ? _.map(room.media.data, o => {
      return {
        src: `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
          o.image
          }`
      };
    })
    : [];

  return (
    <Fragment>
      {!room.media.data.length ? <a href={updateImageUrl} target="_blank">
        <Paper elevation={4} className={classes.imageDefault}>
          <Icon className={classes.iconUpload} color="primary">
            cloud_upload
            </Icon>
          <Button name="update-img" className={classes.button}>
            Cập nhật hình ảnh
            </Button>
        </Paper>
      </a> : ''}
      <div className={classes.imageBig}>
        <img
          src={
            room.media.data.length
              ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
              room.media.data[0].image
              }`
              : imageDefault
          }
          alt="Living Room"
          className={classes.imageProp}
          onClick={e => openLightbox(e, 0)}
        />
      </div>
      <Hidden xsDown>
        <div className={classes.boxImgSmall}>
          <div className={classes.imageSmall}>
            <img
              src={
                room.media.data.length
                  ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                  room.media.data[1].image
                  }`
                  : imageDefault
              }
              className={classes.imageProp}
              onClick={e => openLightbox(e, 1)}
            />
          </div>
          <div className={classes.imageSmall}>
            <img
              src={
                room.media.data.length
                  ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                  room.media.data[2].image
                  }`
                  : imageDefault
              }
              className={classes.imageProp}
              onClick={e => openLightbox(e, 2)}
            />
          </div>
        </div>
      </Hidden>
      <Hidden smDown>
        <div className={classes.boxImgSmall}>
          <div className={classes.imageSmall}>
            <img
              src={
                room.media.data.length
                  ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                  room.media.data[3].image
                  }`
                  : imageDefault
              }
              className={classes.imageProp}
              onClick={e => openLightbox(e, 3)}
            />
          </div>
          <div className={classes.imageSmall}>
            <img
              src={
                room.media.data.length
                  ? `https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                  room.media.data[4].image
                  }`
                  : imageDefault
              }
              className={classes.imageProp}
              onClick={e => openLightbox(e, 4)}
            />
          </div>
        </div>
      </Hidden>
      <Lightbox
        images={ROOM_IMAGES}
        isOpen={props.isOpen}
        onClickPrev={() => {
          setCurrentImage(currentImage - 1);
        }}
        onClickNext={() => {
          setCurrentImage(currentImage + 1);
        }}
        rightArrowTitle="Next"
        leftArrowTitle="Previous"
        onClose={closeLightbox}
        currentImage={currentImage}
        showThumbnails={true}
        onClickThumbnail={(index: number) => setCurrentImage(index)}
      />
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(GridImage);
