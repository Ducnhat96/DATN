import { GlobalContext } from "@/store/context/GlobalContext";
import { createStyles, Grid, Theme } from "@material-ui/core";
import PaginationRC from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/vi_VN";
import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  ComponentType
} from "react";
import { animateScroll as scroll } from "react-scroll/modules";
import { ReactScrollLinkProps } from "react-scroll/modules/components/Link";
import { Dispatch } from "redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { Pagination } from "@/types/Requests/ResponseTemplate";
import {
  IRoomListContext,
  RoomListContext,
  getRoomListMerchant
} from "@/store/context/Merchant/RoomList/RoomListContext";
import RoomCardItem from "./RoomCardItem";

interface IProps {
  classes?: any;
}
const styles: any = () =>
  createStyles({
    title: {
      margin: "24px 0"
    }
  });
const RoomListHost: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { state, dispatch } = useContext<IRoomListContext>(RoomListContext);
  const { roomlist, meta } = state;
  useEffect(() => {
    getRoomListMerchant(dispatch, currentPage);
  }, [currentPage]);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: "easeInOutQuad",
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };
  const changePage = (current: number, pageSize: number) => {
    setCurrentPage(current);

    scrollTop();
  };
  // const changePage = (current: number) => {
  //   setCurrentPage(current);
  //   const query = {
  //     page: current
  //   };
  //   Router.push({
  //     pathname: "/host/room-list",
  //     query: updateObject<any>(Router.query, query)
  //   });
  //   scrollTop();
  // };
  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.title}
      >
        <h2>Danh sách phòng</h2>
      </Grid>
      {roomlist.length
        ? roomlist.map(o => <RoomCardItem key={o.id} room={o} />)
        : "Chưa tìm thấy căn hộ"
          // <NotFoundGlobal height={300} width={250} content={t('roomlist:contentNotFound')} />
      }
      {meta && (
        <PaginationRC
          className="rooms-pagination"
          total={meta.pagination.total}
          locale={localeInfo}
          pageSize={meta.pagination.per_page}
          current={currentPage}
          onChange={changePage}
        />
      )}
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(RoomListHost);
