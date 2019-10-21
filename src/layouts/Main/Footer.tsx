import { ThemeCustom } from '@/components/Theme/Theme';
import React, { ComponentType, Fragment, useContext } from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import GridContainer from '@/layouts/Grid/Container';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import PlaceIcon from '@material-ui/icons/Place';
import { Link } from 'react-router-dom';
import facebook from '@/assets/facebook-social.svg';
import instagram from '@/assets/instagram.svg';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { newRoomLocation } from '@/store/context/Room/RoomIndexContext';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
interface IProps {
   classes?: any
}

// @ts-ignore
const styles: any = (theme: ThemeCustom) => createStyles({
   root: {
      backgroundColor: '#333',
      margin: 0,
      width: '100%',
   },
   firstItem: {
      paddingTop: theme!.spacing!.unit! * 5,
      paddingBottom: theme!.spacing!.unit! * 5,
      width: '100%',
      backgroundColor: '#444953',
   },
   paper: {
      paddingTop: 30,
      color: '#999',
      backgroundColor: '#333',
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '14px',
      },
   },
   rowFooter: {
      backgroundColor: '#333',
   },
   linksList: {
      backgroundColor: '#444953',
   },
   textCenter: {
      textAlign: 'center',
   },
   textLeft: {
      textAlign: 'left',
      paddingBottom: 15,
      [theme!.breakpoints!.only!('xs')]: {
         textAlign: 'center',
         fontSize: '14px',
      },
   },
   textRight: {
      textAlign: 'right',
      paddingBottom: 15,
      [theme!.breakpoints!.only!('xs')]: {
         textAlign: 'center',
         fontSize: '14px',
      },
   },
   icon: {
      fontSize: 32,
   },
   linksListGroupTitle: {
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '14px',
      },
      color: 'white',
      fontSize: '16px',
      marginBottom: '0.5em',
   },
   linksListGroupList: {
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '13px',
      },
      display: 'inline-block',
      listStyle: 'none',
      marginTop: 0,
      paddingLeft: 0,
      fontSize: '15px',
      color: 'rgba(255,255,255,.8)!important',
      lineHeight: '1.7em',
   },
   marginPhone: {
      marginTop: 10,
   },
   iconPhone: {
      fontSize: '1.1em',
      paddingRight: '1em',
   },
   textTerms: {
      display: 'list-item',
      color: 'rgba(255,255,255,.8)!important',
      fontSize: '15px',
      listStyle: 'none',
      marginTop: '0',
      lineHeight: '1.7em',
      textDecoration: 'none',
   },
   socialNetwork: {
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '13px',
      },
      display: '-webkit-inline-box',
      listStyle: 'none',
      marginTop: '7px',
      paddingLeft: 0,
      fontSize: '15px',
      color: 'rgba(255,255,255,.8)!important',
      lineHeight: '1.7em',
   },
   imgSocial: {
      backgroundColor: '#444953',
      borderRadius: '20px',
   },
   li: {
      cursor: 'pointer',
   },
});

// @ts-ignore
const Footer: ComponentType<IProps> = (props: IProps) => {
   const { classes } = props;
   const { history } = useContext<IGlobalContext>(GlobalContext);

   const locationRoom = (values: number) => {
      const pushQuery: RoomUrlParams = {
         city_id: values,
      };

      const location = newRoomLocation(pushQuery);
      history.push(location);
   };

   const facebookUrl = 'https://www.facebook.com';
   const instagramUrl = 'https://www.instagram.com';
   return (
      <Fragment>
         <div className={classes.firstItem}>
            <GridContainer xs={11}>
               <Grid container>
                  <Grid item xs={12} sm={4} md={4} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>
                        Trợ giúp
                     </h5>
                     <ul className={classes.linksListGroupList}>
                        <p><strong>Số điện thoại li&ecirc;n
                                                                                       hệ:</strong> 0396899593<br />
                           <strong>Lĩnh vực kinh doanh:</strong>&nbsp;S&agrave;n giao dịch TMĐT<br /> <strong>Địa chỉ
                                                                                                              t&ecirc;n
                                                                                                              miền:</strong>&nbsp;https://vnhomestay.vn<br />
                           <strong>Loại h&igrave;nh website: </strong>S&agrave;n giao dịch TMĐT</p> <p>&nbsp;</p> <p><a
                              href='http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=41005'></a>
                        </p>
                     </ul>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>
                        Quy định dành cho sàn GDTMĐT
                     </h5>
                     <ul className={classes.linksListGroupList}>
                        <Link to='/' className={classes.textTerms}>
                           <li>Điều khoản sử dụng</li>
                        </Link>
                        <Link to='/' className={classes.textTerms}>
                           <li>Chính sách quyền riêng tư</li>
                        </Link>
                     </ul>

                     <h5 className={classes.linksListGroupTitle}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='https://blog.westay.vn'>Kênh thông tin</Link>
                     </h5>
                     <ul className={classes.linksListGroupList}>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href='#'>Ở đâu</a></li>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href='#'>Chơi gì</a></li>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href='#'>Ăn gì</a></li>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href='#'>Cẩm nang du lịch</a></li>
                     </ul>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>
                        Liên hệ với chúng tôi
                     </h5>
                     <ul className={classes.linksListGroupList}>
                        <li style={{ marginBottom: 8, display: 'flex' }}>
                           <PhoneIcon fontSize='default' className={classes.iconPhone} />
                           <div>
                              <a href="javascript:void(0)" style={{ textDecoration: 'none', color: 'white', display: 'block' }}>Hotline: 0396899593</a>
                           </div>
                        </li>
                        <li style={{ marginBottom: 8 }}>
                           <EmailIcon fontSize='default' className={classes.iconPhone} />
                           <a style={{ textDecoration: 'none', color: 'white' }} href="phamducnhat96bkhn@gmail.com" target="_blank">phamducnhat96bkhn@gmail.com</a>
                        </li>
                        <li style={{ marginBottom: 8 }}>
                           <PlaceIcon fontSize='default' className={classes.iconPhone} />
                           Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                        </li>
                     </ul>

                     <h5 className={classes.linksListGroupTitle}>
                        Mạng xã hội
                     </h5>
                     <ul className={classes.socialNetwork}>
                        <li>
                           <a href={facebookUrl} target="blank">
                              <img src={facebook} className={classes.imgSocial} />
                           </a>
                        </li>
                        <li style={{ marginLeft: '1em' }}>
                           <a href={instagramUrl} target="blank">
                              <img src={instagram} className={classes.imgSocial} />
                           </a>
                        </li>
                     </ul>
                  </Grid>
               </Grid>
            </GridContainer>
         </div>

         <div className={classes.root}>
            <GridContainer xs={11}>
               <Grid container>
                  <Grid item xs={12} sm={6} className={classes.rowFooter}>
                     <Paper
                        elevation={0}
                        className={classNames(
                           classes.paper,
                           classes.textLeft,
                        )}
                     >
                        © 2019 VN-Homestay giữ toàn quyền
                     </Paper>
                  </Grid>
               </Grid>
            </GridContainer>
         </div>
      </Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(Footer);

export const style = styles;
