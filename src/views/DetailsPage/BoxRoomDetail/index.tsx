import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import React, { ComponentType,Fragment, useContext } from "react";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid";
import {
  IRoomDetailsContext,
  RoomDetailsContext
} from "@/store/context/Room/RoomDetailsContext";
import _ from "lodash";
import ContentPlaceHolder from "@/components/PlaceHolder/ContentPlaceHolder";
import HostInfo from "@/components/HostInfo";
import RoomBasic from "./RoomBasic";
import { GlobalContext } from "@/store/context/GlobalContext";
import { Paper } from "@material-ui/core";
import RoomDescription from "./RoomDescription";

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    paper: {
      boxShadow: "none",
      padding: "0 32px 0 8px",
      [theme!.breakpoints!.down!("md")]: {
        padding: "0 8px"
      }
    },
    hostInfo: {
      [theme!.breakpoints!.down!("xs")]: {
        marginTop: 24
      }
    },
    rowMargin: {
      marginTop: 32
    }
  });

const BoxRoomDetail: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;
  console.log("room", room);
  const { router } = useContext(GlobalContext);
  if (room == null) {
    return <ContentPlaceHolder />;
  }
  // const isPreviewPage = router ? router.pathname.includes('preview-room') : false;
  const isPreviewPage = false;

  return (
    <Fragment>
       <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid container spacing={8} justify="center">
              <Grid item xs={11} sm={8} md={9} lg={12} xl={12}>
                <RoomBasic
                  isPreviewPage={isPreviewPage}
                  name={room!.details!.data[0].name}
                  id={room!.id}
                  bathroom={room!.bathroom}
                  max_additional_guest={room!.max_additional_guest}
                  max_guest={room!.max_guest}
                  number_bed={room!.number_bed}
                  number_room={room!.number_room}
                  totalComforts={room!.comforts.data.length}
                  avg_rating={room!.avg_rating}
                  avg_rating_txt={room!.avg_rating_txt}
                />
              </Grid>
              <Grid
                className={classes.hostInfo}
                item
                xs={12}
                sm={4}
                md={3}
                lg={4}
                xl={3}
              >
                {/* <HostInfo
                  id={room!.merchant.data.id}
                  name={room!.merchant.data.name}
                  avatar={room!.merchant.data.avatar}
                  avatar_url={room!.merchant.data.avatar_url}
                /> */}
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                <div className={classes.rowMargin}>
                  <RoomDescription
                    description={room.details.data[0].description}
                    note={room.details.data[0].note}
                    space={room.details.data[0].space}
                    isPreviewPage={isPreviewPage}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(BoxRoomDetail);
