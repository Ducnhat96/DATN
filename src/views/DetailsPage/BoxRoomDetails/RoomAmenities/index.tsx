import { compose } from "recompose";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/styles";
import React, {
  MouseEvent,
  useState,
  ComponentType,
  Fragment,
  useContext
} from "react";
import { Button } from "@material-ui/core/es";
import theme from "@/components/Theme/Theme";
import { Hidden } from "@material-ui/core";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import Orange from "@material-ui/core/colors/orange";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
interface IProps {
  classes?: any;
  room: RoomIndexRes;
}

const styles: any = () =>
  createStyles({
    name: {
      fontWeight: 700,
      margin: "1rem 0 1rem 0"
    },
    icon: {
      color: "#08C299",
      marginRight: 5
    },
    nameIcon: {
      display: "flex",
      alignItems: "center"
    },
    rowMargin: {
      marginBottom: 10,
      fontWeight: 300
    },
    roomAmenitiesIcon: {
      verticalAlign: "bottom",
      width: 32,
      height: 32
    },
    button: {
      color: Orange[500],
      "&:hover": {
        backgroundColor: "#fff"
      },
      "&:focus": {
        backgroundColor: "#fff"
      },
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        paddingLeft: "10px !important"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "22px",
        paddingLeft: "0 !important"
      }
    },
    readLess: {
      color: Orange[500],
      "&:hover": {
        backgroundColor: "#fff"
      },
      "&:focus": {
        backgroundColor: "#fff"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px"
      }
    },
    buttonLess: {
      paddingLeft: "0 !important",
      [theme.breakpoints.up("md")]: {
        padding: "10px 0 !important"
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0 !important"
      }
    },
    iconPlus: {
      fontSize: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "19px"
      }
    }
  });

const RoomAmenities: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const { room } = props;

  const MAX_ITEMS = width === "xs" ? 5 : 8;
  const MORE_ITEMS = !!room && room.comforts.data.length - MAX_ITEMS;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const getRenderedItems = () => {
    if (isOpen) {
      return room.comforts.data;
    }
    return room.comforts.data.slice(0, MAX_ITEMS);
  };

  return (
    !!room && (
      <Fragment>
        <Typography variant="h5" className={classes.name}>
          Tiện nghi căn hộ
        </Typography>
        {room.comforts.data.length === 0 ? (
          <Typography variant="h6">
            Chưa có nội dung, vui lòng cập nhật đầy đủ thông tin phòng của bạn
          </Typography>
        ) : (
          <Grid container spacing={24} className={classes.rowMargin}>
            {_.map(getRenderedItems(), (o, i) => (
              <Fragment key={i}>
                <Grid item xs={2} sm={1} md={1} lg={1}>
                  <img
                    src={o.icon}
                    alt={o.details.data[0].name}
                    className={classes.roomAmenitiesIcon}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid className={classes.nameIcon} item sm={3} md={3} lg={3}>
                    <Typography variant={"body2"}>
                      {o.details.data[0].name}
                    </Typography>
                  </Grid>
                </Hidden>
              </Fragment>
            ))}
            {!isOpen ? (
              <Grid item xs={2} sm={3} className={classes.buttonLess}>
                <Hidden
                  xsUp={room.comforts.data.length < 5}
                  xsDown={room.comforts.data.length < 5}
                >
                  <Button
                    onClick={toggle}
                    className={classes.button}
                    size="small"
                  >
                    <AddIcon className={classes.iconPlus} />
                    {MORE_ITEMS} <Hidden xsDown>tiện ích</Hidden>
                  </Button>
                </Hidden>
              </Grid>
            ) : (
              <Grid item xs={2} sm={3} className={classes.buttonLess}>
                <Button
                  onClick={toggle}
                  className={classes.readLess}
                  size="small"
                >
                  Thu gọn
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Fragment>
    )
  );
};
export default compose<IProps, any>(withStyles(styles))(RoomAmenities);
