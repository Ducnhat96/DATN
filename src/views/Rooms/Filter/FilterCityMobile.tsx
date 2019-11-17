import React, {
  useState,
  ComponentType,
  Fragment,
  useEffect,
  useContext
} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import classNames from "classnames";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  InputAdornment,
  createStyles
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { SearchSuggestRes } from "@/types/Requests/Search/SearchResponse";
import { searchSuggest } from "@/store/context/searchSuggestion";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReducersType } from "@/store/reducers";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import theme, { ThemeCustom } from "@/components/Theme/Theme";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Theme } from "react-autosuggest";
import { Paper } from "material-ui";

export const TransitionCustom = (props: any) => (
  <Slide direction="down" {...props} timeout={{ enter: 500, exit: 200 }} />
);

interface Props {
  classes?: any;
  children?: any;
  onClose?: any;
}

const DialogTitle: ComponentType<Props> = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))((props: Props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export interface IProps {
  filter?: SearchFilterState;
  classes?: any;
  open?: boolean;
  setOpen(value: boolean): void;
  updateSearchText(inputSearch: string): void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    progress: {
      margin: 16
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    paper: {
      width: "100%",
      height: "100%",
      //   position: "absolute",
      //   backgroundColor: theme.palette.background.paper,
      //   boxShadow: theme.shadows[5],
      //   padding: theme.spacing.unit * 4,
      outline: "none"
    }
  })
);

const FilterCityMobile: ComponentType<IProps> = props => {
  const [data, setData] = useState<SearchSuggestRes[]>([]);
  const classes = useStyles(props);
  const { setOpen, updateSearchText, filter, open } = props;

  const handleChange = async (e: any) => {
    const data = await searchSuggest(e.target.value);
    setData(data);
  };

  useEffect(() => {
    searchSuggest("").then(data => setData(data));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (name: string) => {
    setOpen(false);
    updateSearchText(name);
  };

  return (
    <Fragment>
      <Slide direction="left" in={open} timeout={{ enter: 500, exit: 200 }}>
        <Paper className={classes.paper}>
          <DialogTitle onClose={() => setOpen(false)}>Tìm kiếm</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Thành phố, Quận huyện"
              type="email"
              fullWidth
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <List
              // component="nav"
              className={classNames({ [classes.center]: !data.length })}
            >
              {!data.length && (
                <CircularProgress className={classes.progress} />
              )}

              {data
                .filter(item => item.type !== 3)
                .map((city, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleClick(city.name)}
                  >
                    <ListItemText
                      primary={city.name}
                      secondary={city.country}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <SendIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </DialogContent>
        </Paper>
      </Slide>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateSearchText: (inputSearch: string) => {
      dispatch({
        type: "SET_SEARCH_TEXT",
        searchText: inputSearch
      });
    }
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(FilterCityMobile);
