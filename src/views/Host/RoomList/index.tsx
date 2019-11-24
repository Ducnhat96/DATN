import React, { Fragment, useContext, useEffect, ComponentType, useReducer } from "react";
import Cookies from "universal-cookie";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { compose } from "recompose";
import { withCookies } from "react-cookie";
import { RoomListContext, RoomListState, RoomListAction, RoomListReducer, RoomListStateInit } from "@/store/context/Merchant/RoomList/RoomListContext";
import RoomListHost from "@/components/Merchant/Listing/RoomListHost";
interface IProps {
  classes?: any;
  cookies: Cookies;
}

const RoomList: ComponentType<IProps> = (props: IProps) => {
  const { cookies } = props;
  const isLogin = !!cookies.get("_token");
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const [state, dispatch] = useReducer<RoomListState, RoomListAction>(
    RoomListReducer,
    RoomListStateInit
  );
  useEffect(() => {
    !isLogin && history.push("/auth/signin");
  }, [isLogin]);
  return (
    <Fragment>
      {/* <NavHeader_Merchant /> */}
      <RoomListContext.Provider value={{ state, dispatch }}>
        {!!cookies.get("_token")
        ? <RoomListHost />
        : 
          "44"}
      </RoomListContext.Provider>
    </Fragment>
  );
};
export default compose<IProps, any>(withCookies)(RoomList);
