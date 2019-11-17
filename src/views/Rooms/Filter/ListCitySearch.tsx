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
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import classNames from "classnames";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Theme
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
import { ThemeCustom } from "@/components/Theme/Theme";
import { createStyles, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const TransitionCustom = (props: any) => (
  <Slide direction="down" {...props} timeout={{ enter: 500, exit: 200 }} />
);

interface IProps {
  filter: SearchFilterState;
  classes?: any;
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
    }
  })
);

const ListCitySearch: ComponentType<IProps> = props => {
  const classes = useStyles(props);
  const [data, setData] = useState<SearchSuggestRes[]>([]);
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const [inputSearch, setInputSearch] = useState<string>("");

  const { setOpen, updateSearchText, filter} = props;

  const handleChange = async (e: any) => {
    const data = await searchSuggest(e.target.value);
    setData(data);
    // setInputSearch(e.target.value);
  };

  useEffect(() => {
    searchSuggest("").then(data => setData(data));
    // setInputSearch(filter.searchText);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (name: string) => {
    history.push(`/rooms?name=${name}`);
    setOpen(false);
    updateSearchText(name);
  };

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Đi đâu?</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Thành phố, Quận huyện"
          type="email"
          fullWidth
          // value={inputSearch}
          onChange={handleChange}
        />

        <List
          // component="nav"
          className={classNames({ [classes.center]: !data.length })}
        >
          {!data.length && <CircularProgress className={classes.progress} />}

          {data
            .filter(item => item.type !== 3)
            .map((city, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleClick(city.name)}
              >
                <ListItemText primary={city.name} secondary={city.country} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <SendIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
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
)(ListCitySearch);
