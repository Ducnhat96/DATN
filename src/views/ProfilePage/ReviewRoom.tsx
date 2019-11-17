import createStyles from '@material-ui/core/styles/createStyles';
import React, { ComponentType, Fragment, useState, ChangeEvent, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import StarRatings from 'react-star-ratings';
import { SnackbarContent, Snackbar, Theme, CardActionArea, CardContent, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { RoomReviewInfoReq } from '@/types/Requests/ReviewRoom/ReviewRequest';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AxiosError } from 'axios';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { formatMoney } from '@/utils/mixins';
import NavTop from '@/components/ToolBar/NavTop';
import Footer from '@/layouts/Main/Footer';
import { RouteChildrenProps, match } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import qs from 'query-string'
import { makeStyles } from '@material-ui/styles';

interface IProps extends RouteChildrenProps {
  classes?: any,
  match: match<any>
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  card: {
    padding: '0 5px',
    backgroundColor: 'transparent',
    marginTop: 15,
  },
  media: {
    height: '12em',
    borderRadius: '0.2em',
  },
  cardContent: {
    padding: 0,
    paddingTop: '1em',
  },
  nameCity: {
    fontWeight: 500,
    fontSize: '0.8em',
    lineHeight: '16px',
    letterSpacing: 'normal',
    textTransform: 'uppercase',
    color: 'rgb(118, 118, 118)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    overflow: 'hidden',
  },
  nameRoom: {
    fontWeight: 500,
    fontSize: '1.25em',
    lineHeight: '21px',
    maxHeight: '42px',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    marginTop: '7px',
    marginBottom: '4px',
    overflow: 'hidden',
    color: 'rgb(72, 72, 72)',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textTransform: 'uppercase',
  },
  priceRoom: {
    fontWeight: 'normal',
    fontSize: '1em',
    lineHeight: '18px',
    letterSpacing: 'normal',
    color: 'rgb(72, 72, 72)',
    marginBottom: '4px',
  },
  totalReview: {
    overflowWrap: 'break-word',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '1.33333em',
    color: 'rgb(72, 72, 72)',
    margin: '0px',
    float: 'left',
    paddingLeft: '4px',
  },
  starRatings: {
    float: 'left',
  },
  boxPadding: {
    padding: 20,
  },
  title: {
    fontWeight: 500,
    fontSize: '1em',
    lineHeight: '21px',
    maxHeight: '42px',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    overflow: 'hidden',
    color: 'rgb(109, 95, 95)',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginTop: '13px',
  },
  review: {
    padding: '0px 5px',
  },
  spanLike: {
    fontWeight: 600,
    fontSize: '1em',
    lineHeight: '21px',
    paddingRight: 25,
    color: 'rgb(109, 95, 95)',
  },
  radio: {
    paddingLeft: 0,
    display: 'block',
  },
  snackContent: {
    backgroundColor: '#43A047',
  },
  iconSnackContent: {
    opacity: 0.9,
    marginRight: 8,
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    color: '#fff',
  },
})
);

// @ts-ignore
const ReviewRoom: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const { match } = props;
  const { history, location } = useContext<IGlobalContext>(GlobalContext);
  const [rating_cleanliness, setRating_cleanliness] = useState<number>(3);
  const [rating_quality, setRating_quality] = useState<number>(3);
  const [rating_service, setRating_service] = useState<number>(3);
  const [rating_valuable, setRating_valuable] = useState<number>(3);
  const [rating_avg_rating, setRating_avg_rating] = useState<number>(3);
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [roomReview, setRoomReview] = useState<RoomReviewInfoRes | null>(null);
  const [comment, setComment] = useState<string>('');
  const [openSnackRe, setOpenSnackRe] = useState<boolean>(false);

  useEffect(() => {
    let id = parseInt(match.params.id);
    let token = qs.parse(location.search!);
    // if (isNaN(id)) history.push('/');
    axios.get(`reviews/${id}?token=${token.token}&time=${token.time}`)
      .then((res: AxiosRes<RoomReviewInfoRes>) => {
        setRoomReview(res.data.data);
      }).catch((err: AxiosError) => {
        const changeError = (mess: string) => {
          history.push('/error');
          setTimeout(() => {
            alert(mess);
          }, 500);
          // window.location.replace('/');
        };
        switch (err.response!.status) {
          case 401: {
            changeError('Bạn cần đăng nhập để thực hiện chức năng này');
            break;
          }
          case 422: {
            changeError('Bạn không có quyền review phòng này');
            break;
          }

        }
      });

  }, []);

  const changeLike = (e: ChangeEvent<{}>, value: string) => {
    setSelectedValue(parseInt(value));
  };

  const handleSubmit = () => {
    const data: RoomReviewInfoReq = {
      cleanliness: rating_cleanliness,
      quality: rating_quality,
      service: rating_service,
      valuable: rating_valuable,
      avg_rating: rating_avg_rating,
      booking_id: roomReview === null ? 0 : roomReview.booking_id,
      comment: comment,
      like: selectedValue,
      recommend: selectedValue
    };

    // console.log(data);
    axios.post('reviews', data)
      .then(res => {
        setOpenSnackRe(!openSnackRe);
        // setTimeout(() => {
        //   window.location.replace('/');
        // }, 1000);

      })
      .catch(error => {

      });
  };

  return (
    <form>
      {roomReview ? (
        <Fragment>
          <NavTop />
          <Paper square className={classes.boxPadding}>
            <Grid container spacing={4} justify='center' alignContent='center'>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant='h6' className={classes.review}>
                  Đánh giá và nhận xét
                </Typography>
                <Card className={classes.card}>
                  <CardActionArea>
                    {/* <CardMedia
                      className={classes.media}
                      image={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${roomReview.image}`}
                      title = 'VN-Homestay-Homestay cho người Việt'
                    /> */}
                    <CardContent className={classes.cardContent}>
                      <Typography component='p' className={classes.nameCity}>
                        {roomReview.room_type_text}
                      </Typography>
                      <Typography variant='h5' component='h2' className={classes.nameRoom}>
                        {roomReview.name}
                      </Typography>
                      <Typography component='p' className={classes.priceRoom}>
                        {`${formatMoney(roomReview.price_day, 0)}`}đ <sub>/ngày</sub> - {`${formatMoney(roomReview.price_hour, 0)}`}đ <sub>/4giờ</sub>
                        {/*950000đ <sub>/ngày</sub> - 400000đ <sub>/4 giờ</sub>*/}
                      </Typography>
                      <div>
                        <span className={classes.starRatings}>
                          <StarRatings
                            rating = {roomReview.avg_avg_rating} //index rating
                            starDimension='14px'
                            starSpacing='1px'
                            starRatedColor='#46AFCC'
                          />
                        </span>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={1}>

              </Grid>
              <Grid item xs={12} sm={12} md={7}>
                <Typography variant='h6'>
                  Nhận xét về phòng
                </Typography>
                <TextField
                  id='outlined-multiline-static'
                  label = 'Hãy cho chúng tôi biết những trải nghiệm và đánh giá của bạn về căn homestay này.'
                  multiline
                  rows='6'
                  rowsMax='6'
                  fullWidth
                  defaultValue=''
                  onChange={(e) => (setComment(e.target.value))}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                />
                <Grid container>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' component='h2' className={classes.title}>
                      Sạch sẽ
                    </Typography>
                    <StarRatings
                      rating = {rating_cleanliness} //index rating
                      starDimension='28px'
                      starSpacing='1px'
                      starRatedColor='#46AFCC'
                      changeRating={rating => setRating_cleanliness(rating)}
                    />
                  </Grid>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' component='h2' className={classes.title}>
                      Chất lượng phòng
                    </Typography>
                    <StarRatings
                      rating = {rating_quality} //index rating
                      starDimension='28px'
                      starSpacing='1px'
                      starRatedColor='#46AFCC'
                      changeRating={rating => setRating_quality(rating)}
                    />
                  </Grid>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' className={classes.title}>
                      Dịch vụ phòng
                    </Typography>

                    <StarRatings
                      rating = {rating_service} //index rating
                      starDimension='28px'
                      starSpacing='1px'
                      starRatedColor='#46AFCC'
                      changeRating={rating => setRating_service(rating)}
                    />
                  </Grid>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' className={classes.title}>
                      Giá trị
                    </Typography>

                    <StarRatings
                      rating = {rating_valuable} //index rating
                      starDimension='28px'
                      starSpacing='1px'
                      starRatedColor='#46AFCC'
                      changeRating={rating => setRating_valuable(rating)}
                    />
                  </Grid>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' className={classes.title}>
                      Tổng quan phòng
                    </Typography>

                    <StarRatings
                      rating = {rating_avg_rating} //index rating
                      starDimension='28px'
                      starSpacing='1px'
                      starRatedColor='#46AFCC'
                      changeRating={rating => setRating_avg_rating(rating)}
                    />
                  </Grid>
                  <Grid item xs = {12} sm = {6} lg = {6}>
                    <Typography variant='h5' className={classes.title}>
                      Bạn có hài lòng về phòng này không ?
                    </Typography>
                    <div>
                      <FormControl>
                        <RadioGroup
                          onChange={changeLike}
                          name='like'
                          value={selectedValue.toString()}
                          classes={
                            {
                              root: classes.radio,
                            }
                          }
                        >
                          <FormControlLabel value='1' control={<Radio
                            checkedIcon={<SentimentVerySatisfied color='error' />} />} label='Hài lòng' />
                          <FormControlLabel value='0' control={<Radio
                            checkedIcon={<SentimentVeryDissatisfied color='error' />} />}
                            label='Không hài lòng' />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Button variant='contained' color='primary' className={classes.button}
                  onClick={handleSubmit}>
                  Gửi đánh giá
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnackRe}
            autoHideDuration={5000}
            onClose={() => {
              setOpenSnackRe(!openSnackRe);
            }}
          >
            <SnackbarContent
              className={classes.snackContent}
              aria-describedby='client-snackbar'
              message={
                <span id='client-snackbar' className={classes.message}>
                  <CheckCircleIcon className={classes.iconSnackContent} />
                  Gửi đánh giá thành công!
                </span>
              }
              action={[
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  className={classes.close}
                  onClick={() => {
                    setOpenSnackRe(!openSnackRe);
                  }}
                >
                  <CloseIcon className={classes.iconClose} />
                </IconButton>,
              ]}
            />
          </Snackbar>
          <Footer />
        </Fragment>
      ) : <SimpleLoader />}
    </form>
  );
};

export default ReviewRoom;


