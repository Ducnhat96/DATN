import { ThemeCustom } from '@/components/Theme/Theme';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import LocationHomeMap from "@/views/DetailsPage/LocationHomeMap";
import React, { ComponentType, Fragment, useContext, useState } from 'react';
import { compose, withProps } from 'recompose';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar";
import avatarDemo from '@/assets/user.png';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/context/Room/RoomDetailsContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
// @ts-ignore
import StarRatings from 'react-star-ratings';
import 'rc-pagination/assets/index.css';
import moment from 'moment';

interface IProps {
  classes?: any,
  center?: Object,
  zoom?: number,
  review: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  rowMargin: {
    margin: '10px 0',
    padding: '12px 10px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0px',
    },
    borderTop: '1px solid #e0e0e0',
  },
  rowMarginBorderTop: {
    margin: '10px 0',
    borderTop: '1px solid #e0e0e0',
    padding: '15px 0px',
  },
  rowMargin2: {
    margin: '10px 0',
  },
  titleHighlight: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: '#484848',
  },
  boxMark: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 80,
    width: 80,
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
    border: 'double 9px transparent',
    backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #74ebd5,#acb6e5 )',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  Mark: {
    backgroundColor: '#1ba0e2',
    backgroundImage: 'linear-gradient(to bottom, #74ebd5, #acb6e5)',
    borderRadius: '50%',
    width: '90%',
    height: '90%',
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    MozTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  TypoMark: {
    color: '#fff',
    fontSize: '2.5vw',
    fontWeight: 500,
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    MozTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
    [theme.breakpoints.down('md')]: {
      fontSize: '3.5vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '4.5vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '8vw',
    },
  },
  status: {
    color: '#004fa2',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: '1.5vw',
    [theme.breakpoints.down('md')]: {
      fontSize: '2vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5vw',
      paddingTop: 5,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4.5vw',
      paddingTop: 5,
    },
  },
  titleRating: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  valueRating: {
    textAlign: 'right',
  },
  titleReview: {
    fontSize: 18,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16.5,
    },
    fontWeight: 500,
    lineHeight: '1.375em',
    color: '#484848',
    padding: '4px 0',
  },
  comments: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    color: '#7E8082',
    padding: '4px 0',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  nameUser: {
    fontSize: 17,
  },
  boxPagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  boxMap: {
    height: 350,
    margin: '10px 0',
    borderRadius: 5,
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  },
  paddingXS: {
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      margin: '0 auto',
    },
  },
});


const BoxReviews: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [data] = useState<any[]>(props.review);
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { width } = useContext<IGlobalContext>(GlobalContext);
  // console.log(data.length);
  const { room } = state;
  if (room == null) { return <SimpleLoader /> }

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const newData = data.slice(indexOfFirst, indexOfLast);

  const ChangePage = (current: number) => {
    setCurrentPage(current);
  };
  // console.log(newData)
  const renderListComment = newData.map((todo, index) => {
    console.log(todo)
    return (
      <Grid container className={classes.rowMarginBorderTop} key={index}>
        <Grid item container xs={12}>
          <Grid item xs={3} sm={2}>
            {/* <Avatar alt='Avatar' src={todo.user.data.avatar !== '' ? (`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${todo.user.data.avatar}`) : avatarDemo} className={classes.avatar} /> */}
            <Avatar alt='Avatar' src={avatarDemo} className={classes.avatar} />
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography variant='h6' className={classes.nameUser}>
              {todo!.user.data.length !== 0 ? (todo!.user.data.name !== '' ? todo!.user.data.name : 'Ẩn danh') : 'Ẩn danh'}
              <StarRatings
                rating={todo!.avg_rating} //index rating
                starDimension='14px'
                starSpacing='1px'
                starRatedColor='#ffb40b'
              />
            </Typography>
            <Typography variant={'caption'}>{moment(todo.created_at).format('DD/MM/YYYY')}</Typography>
            <Typography className={classes.comments}>
              {todo.comment}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <Fragment>
      <div className={classes.rowMargin}>
        <div className={classes.paddingXS}>
          <Typography className={classes.titleHighlight}>
            Đánh giá ({data.length})
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <div className={classes.rowMargin2}>
                <div style={{ textAlign: 'center' }}>
                  <StarRatings
                    rating={room!.avg_rating} //index rating
                    starDimension='24px'
                    starSpacing='1px'
                    starRatedColor='#ffb40b'
                  />
                </div>
                <div className={classes.boxMark}>
                  <div className={classes.Mark}>
                    <Typography variant={"h5"} className={classes.TypoMark}>
                      {room!.avg_rating}
                    </Typography>
                  </div>
                </div>
                <Typography variant={"h5"} className={classes.status}>
                  {room!.avg_rating_txt}
                </Typography>
              </div>
            </Grid>
            <Grid item container xs={12} sm={9}>
              <Grid item xs={12}>
                <div className={classes.rowMargin2}>
                  <Grid container className={classes.rowMargin2}>
                    <Grid item xs={4} sm={7} className={classes.titleRating}>
                      <Typography className={classes.titleReview}>
                        Dịch vụ
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={5} className={classes.valueRating}>
                      <StarRatings
                        rating={room!.avg_service} //index rating
                        starDimension={width === 'xs' ? '22px' : '24px'}
                        starSpacing='1px'
                        starRatedColor='#FFC412'
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.rowMargin2}>
                    <Grid item xs={4} sm={7} className={classes.titleRating}>
                      <Typography className={classes.titleReview}>
                        Chất lượng
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={5} className={classes.valueRating}>
                      <StarRatings
                        rating={room!.avg_quality} //index rating
                        starDimension={width === 'xs' ? '22px' : '24px'}
                        starSpacing='1px'
                        starRatedColor='#FFC412'
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.rowMargin2}>
                    <Grid item xs={4} sm={7} className={classes.titleRating}>
                      <Typography className={classes.titleReview}>
                        Giá trị
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={5} className={classes.valueRating}>
                      <StarRatings
                        rating={room!.avg_valuable} //index rating
                        starDimension={width === 'xs' ? '22px' : '24px'}
                        starSpacing='1px'
                        starRatedColor='#FFC412'
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.rowMargin2}>
                    <Grid item xs={4} sm={7} className={classes.titleRating}>
                      <Typography className={classes.titleReview}>
                        Sạch sẽ
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={5} className={classes.valueRating}>
                      <StarRatings
                        rating={room!.avg_cleanliness} //index rating
                        starDimension={width === 'xs' ? '22px' : '24px'}
                        starSpacing='1px'
                        starRatedColor='#FFC412'
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.rowMargin}>
        <div className={classes.paddingXS}>
          <Typography className={classes.titleHighlight}>
            {room!.total_review} Nhận xét
          </Typography>
          {renderListComment}
          <div className={classes.boxPagination}>
            <Pagination className='ant-pagination' total={data.length} locale={localeInfo}
              pageSize={pageSize}
              current={currentPage}
              onChange={ChangePage}
            />
          </div>
        </div>
      </div>
      {/* <div className = {classes.rowMargin}>
        <div className = {classes.paddingXS}>
          <Typography className = {classes.titleHighlight}>
            Bản đồ
          </Typography>
          <div className = {classes.boxMap}>
            <LocationHomeMap zoom = {14}
                             center = {{lat: parseFloat(room!.latitude), lng: parseFloat(room!.longitude)}} />
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BoxReviews);
