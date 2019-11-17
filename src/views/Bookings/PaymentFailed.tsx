import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import NavTop from '@/components/ToolBar/NavTop';
import Footer from '@/layouts/Main/Footer';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  content:{
    marginTop: '3em',
    marginBottom: '3em',
    textAlign:'center',
  },
  textContent:{
    width:'100%',
  }
});

// @ts-ignore
const PaymentFailed: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Fragment>
      <NavTop/>
      <div className={classes.panel}>
        <GridContainer xs={11} className={classes.content}>
          <Grid container spacing = {0} className = {classes.content}>
            <h1 className={classes.textContent}>Thanh toán không thành công</h1>
            <p className={classes.textContent}>Vui lòng liên hệ với chúng tôi theo Hotline: 0916.374.057 để được hỗ trợ.</p>
            <Link to = '/' className={classes.textContent}>
              <p>Click vào đây để quay trở về trang chủ</p>
            </Link>
          </Grid>
        </GridContainer>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(PaymentFailed);
