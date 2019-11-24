import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { Grid, Paper } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
import React, { Fragment, ComponentType } from "react";
import RoomBasic from "./RoomBasic/index";
import { compose } from "recompose";
import theme from "@/components/Theme/Theme";
import RoomDescription from "./RoomDescription";
import RoomAmenities from "./RoomAmenities";

const styles: any = () =>
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
    },
    wrapperBasic: {
      display: "flex",
      justifyContent: "start"
    }
  });

interface IProps {
  classes?: any;
  room: RoomIndexRes;
}
const BoxRoomDetail: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const { room } = props;
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid
              container
              spacing={8}
              justify="center"
              className={classes.wrapperBasic}
            >
              <Grid item xs={11}>
                <RoomBasic
                  name={room.details.data[0].name}
                  id={room.id}
                  bathroom={room.bathroom}
                  max_additional_guest={room.max_additional_guest}
                  max_guest={room.max_guest}
                  number_bed={room.number_bed}
                  number_room={room.number_room}
                  totalComforts={room.comforts.data.length}
                  avg_rating={room.avg_rating}
                  avg_rating_txt={room.avg_rating_txt}
                />
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                  <Grid className={classes.rowMargin}>
                    <RoomDescription
                      description={room.details.data[0].description}
                      note={room.details.data[0].note}
                      space={room.details.data[0].space}
                    />
                  </Grid>
                  <Grid className={classes.rowMargin}>
                    <RoomAmenities room={room} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(BoxRoomDetail);
