import { Reducer } from "redux";
import * as actions from "@/store/actions/types";
import { updateObject } from "../utility";

export type SearchNavState = {
  readonly openSearch: boolean;
  readonly openDrawer: boolean;
};

export interface SearchNavAction {
  type: string;
  openSearch?: boolean;
  openDrawer?: boolean;
}

const init: SearchNavState = {
  openSearch: false,
  openDrawer: false
};

const ChangeStatusBooking = (
  state: SearchNavState,
  action: SearchNavAction
) => {
  let obj: any = { openSearch: action.openSearch };
  return updateObject<SearchNavState>(state, obj);
};

const changeStatusDrawer = (state: SearchNavState, action: SearchNavAction) => {
  const obj: any = { openDrawer: action.openDrawer };
  return updateObject<SearchNavState>(state, obj);
};

const reducerSearchNav: Reducer = (
  state: SearchNavState = init,
  action: SearchNavAction
): SearchNavState => {
  switch (action.type) {
    case actions.TOGGLE_SEARCH_NAV_MOBILE:
      return ChangeStatusBooking(state, action);
    case actions.TOGGLE_DRAWER:
      return changeStatusDrawer(state, action);
    default:
      return state;
  }
};

export default reducerSearchNav;
