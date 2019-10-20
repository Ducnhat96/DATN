import * as _ from "@/store/actions/actionTypes";
import { updateObject } from "@/store/utility";

export type LoginInfoState = {
  readonly email: string;
  readonly isRemember: boolean;
};

export interface LoginInfoAction {
  type: string;
  value?: string | number;
}

const init: LoginInfoState = {
  email: "",
  isRemember: false
};

/**
 *
 * @param state
 * @param action
 */
const saveDraftedInfo = (state: LoginInfoState, action: LoginInfoAction) => {
  let obj: any = action.value;
  return updateObject<LoginInfoState>(state, obj);
};

const reducer = (state: LoginInfoState = init, action: LoginInfoAction) => {
  switch (action.type) {
    case _.SAVE_DRAFTED_INFO:
      return saveDraftedInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
