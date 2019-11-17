import React, {
  ChangeEvent,
  ComponentType,
  Fragment,
  useContext,
  useState,
  useEffect
} from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper/Paper";
import BookingList from "@/views/ProfilePage/BookingList";
import InsertDriveFileOutlined from "@material-ui/icons/InsertDriveFileOutlined";
import { ThemeCustom } from "@/components/Theme/Theme";
import { Typography, Theme } from "@material-ui/core";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxBookingProfile: {
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: 50
      }
    },
    tabsRoot: {
      borderBottom: "1px solid #e8e8e8"
    },
    tabsIndicator: {
      backgroundColor: "#ff9800"
    },
    tabRoot: {
      textTransform: "initial",
      minWidth: 72,
      fontWeight: theme.typography!.fontWeightRegular,
      marginRight: theme.spacing.unit * 4,
      fontFamily: ["-apple-system", "Roboto"].join(","),
      "&:hover": {
        color: "#ff9800",
        opacity: 1
      },
      
      "&:focus": {
        color: "#ff9800"
      }
    },
    tabSelected: {
      color: "#ff9800",
      fontWeight: theme.typography!.fontWeightMedium
    },
    myBooking: {
      paddingTop: 20,
      width: "90%",
      margin: "0 auto"
    },
    fakeData: {
      position: "absolute",
      width: "100%",
      paddingTop: 50,
      zIndex: -1,
      left: "50%",
      top: "50%",
      WebkitTransform: "translateX(-50%) translateY(0)",
      MozTransform: "translateX(-50%) translateY(0)",
      transform: "translateX(-50%) translateY(0)",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: 75
      }
    }
  })
);

interface ITabContainer {
  children: any;
}

interface IBookingProfile {
  classes?: any;
}

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

const BookingProfile: ComponentType<IBookingProfile> = (
  props: IBookingProfile
) => {
  const classes = useStyles(props);
  const [val, setVal] = useState<number>(0);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  // useEffect(() => {
  //   console.log("value", val);
  // }, []);

  const handleChange = (event: ChangeEvent<{}>, values: number) => {
    // console.log("fucking small change");
    setVal(values);
  };

  return (
    <Fragment>
      <Paper elevation={0} className={classes.boxBookingProfile}>
        {/* <BookingList status={1} /> */}
        <Tabs
          value={val}
          onChange={handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          variant={width == "xs" ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Chờ xác nhận"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Sắp tới"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Đã hoàn thành"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Đã hủy"
          />
        </Tabs>

        <div>{val === 0 && <TabContainer> <BookingList status = {1} />
          </TabContainer>}</div>
        <div>
          {val === 1 && (
            <TabContainer><BookingList status = {2} /></TabContainer>
          )}
        </div>
        <div>
          {val === 2 && (
            <TabContainer> <BookingList status = {4} /></TabContainer>
          )}
        </div>
        <div>
          {val === 3 && (
            <TabContainer><BookingList status = {5} /></TabContainer>
          )}
        </div>
      </Paper>
    </Fragment>
  );
};

export default BookingProfile;
