import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType, useReducer, useEffect, useContext } from 'react';
import { compose } from 'recompose';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid/Grid';
import BankList from '@/components/Bookings/Payments/BankList';
import Grey from '@material-ui/core/colors/grey';
import {
  PaymentState,
  PaymentAction,
  PaymentReducer,
  PaymentStateInit,
  PaymentContext,
  getBankList,
} from '@/store/context/Payment/PaymentContext';
import { RouteChildrenProps } from 'react-router';
import { PaymentRouterParams } from '@/types/Requests/Payment/PaymentResponse';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import PaymentInfo from '@/components/Bookings/Payments/PaymentInfo';

interface IProps extends RouteChildrenProps<PaymentRouterParams> {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  container: {
    marginTop: 30,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginTop: 5
    }
  },
  parentContainer: {
    minHeight: '100vh',
    backgroundColor: Grey[200],
  },
  info: {
    [theme.breakpoints.between('xs', 'sm')]: {
      order: 1,
    },
  },
});

// @ts-ignore
const Payment: ComponentType<IProps> = (props: IProps) => {
  const { classes, match } = props;
  const [state, dispatch] = useReducer<PaymentState, PaymentAction>(PaymentReducer, PaymentStateInit);
  const { history } = useContext<IGlobalContext>(GlobalContext);

  useEffect(() => {
    if (match !== null) {
      let uuid = match!.params.uuid;
      getBankList(uuid).then(res => {
        const lists = res.data;
        const room = lists.room.data;
        const payment_methods = lists.bank_list;

        dispatch({
          type: 'setAll',
          room, lists, payment_methods,
        });
      }).catch(err => {
        history.push('/404');
      });
    } else {
      history.push('/404');
    }
  }, []);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      <NavTop />
      <GridContainer xs={11} sm={11} md={10} className={classes.parentContainer}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} md={8} className={classes.info}>
            <BankList />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentInfo />
          </Grid>
        </Grid>
      </GridContainer>
    </PaymentContext.Provider>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Payment);
