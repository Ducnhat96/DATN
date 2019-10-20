import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext, useState, useEffect } from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PaymentContext, IPaymentContext, redirectToBaoKim } from '@/store/context/Payment/PaymentContext';
import _ from 'lodash';
import Grey from '@material-ui/core/colors/grey';
import Orange from '@material-ui/core/colors/orange';
import { INTERNET_BANKING, VISA } from '@/utils/store/global';
import { BaoKimBankInfo } from '@/types/Requests/Payment/PaymentResponse';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import classNames from 'classnames';
import Button from '@material-ui/core/Button/Button';
import Visa from '@/assets/visa.png';
import AtmCard from '@/assets/atm-card.png';
import Hidden from '@material-ui/core/Hidden/Hidden';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import '@/styles/payment_hover.scss'

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    padding: '1rem',
  },
  divider: {
    marginTop: 15,
  },
  caption: {
    fontSize: '0.8rem',
  },
  details: {
    background: 'ghostwhite',
  },
  bankList: {
    display: 'inline',
    padding: '0.3rem',
    cursor: 'pointer',
  },
  bankImg: {
    width: 70,
    border: `1px solid ${Grey[400]}`,
    marginTop: '0.3rem',
    '&:hover': {
      border: `1px solid ${Orange[600]}`,
    },
    [theme!.breakpoints!.only!('xs')]: {
      width: 50,
    },
  },
  bankImgFocus: {
    border: `2px solid ${Orange[700]}`,
  },
  ulBank: {
    paddingInlineStart: '0px',
    marginBlockStart: '0px',
    marginBlockEnd: '0px',
  },
  typo: {
    paddingLeft: 10,
  },
  alignCenter: {
    alignItems: 'center',
  },
});

// @ts-ignore
const BankList: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const [listBank, setListBank] = useState<BaoKimBankInfo[]>([]);
  const [visa, setVisa] = useState<BaoKimBankInfo[]>([]);
  const [bankId, setBankId] = useState<number>(0);
  const [paymentPending, setPaymentPending] = useState<boolean>(false);
  const { state } = useContext<IPaymentContext>(PaymentContext);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const xsMode = width === 'xs';

  const { payment_methods, lists } = state;

  const changeBankId = (id: string) => {
    setBankId(parseInt(id));
  };

  const triggerPayment = () => {
    if (bankId !== 0) {
      setPaymentPending(true);
      redirectToBaoKim(lists!.uuid, bankId).then(res => {
        const url = res.data;
        window.location.replace(url);
      }).catch(err => {
        setPaymentPending(false);
      });
    } else {
      alert('Vui lòng chọn một hình thức thanh toán')
    }
  };

  useEffect(() => {
    _.map(payment_methods, o => {
      if (o.payment_method === INTERNET_BANKING) {
        setListBank(o.banks);
      } else if (o.payment_method === VISA) {
        setVisa(o.banks);
      }
    });
  }, [payment_methods]);

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item md={12} xs={12}>
            <Typography variant='h6'>THÔNG TIN THANH TOÁN</Typography>
            <Typography variant='subtitle2'>Bạn vui lòng chọn một trong các hình thức thanh toán bên dưới để tiến thành thanh toán. Nếu bạn thanh toán qua thẻ ATM nội địa, vui lòng chọn ngân hàng phù hợp.
            Việc thanh toán sẽ được tiến hành thông qua cổng thanh toán điện tử <a style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'none', color: '#4285F4' }}>Bảo Kim</a></Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item md={12} xs={12}>
            <ExpansionPanel elevation={0} defaultExpanded={!xsMode}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{
                content: classes.alignCenter,
              }}>
                <Hidden xsDown>
                  <img src={AtmCard} alt='Internet Banking' />
                </Hidden>
                <Typography className={classes.typo}>Thanh toán qua thẻ ATM nội địa</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Grid container spacing={8}>
                  <Grid item md={12} xs={12}>
                    <Typography variant='subtitle2'>Thanh toán qua thẻ ATM nội địa</Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <i className={classes.caption}
                    >Là hình thức thanh toán trực tuyến an toàn và bảo mật qua các thẻ
                       nội địa do các ngân hàng phát hành (cổng thanh toán Bảo Kim). Dịch
                       vụ được kích hoạt tự động ngay sau khi thanh toán, đơn giản và
                     thuận tiện hơn cho khách hàng.</i>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography variant='subtitle2'>Quý khách hàng lưu ý:</Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <i className={classes.caption}
                    >- Để thanh toán bằng thẻ ATM, thẻ của Quý khách phải được đăng ký
                       và kích hoạt chức năng thanh toán trực tuyến với ngân hàng
                     (internet banking) trước khi sử dụng.</i><br />
                    <i className={classes.caption}
                    >- Các thông tin thẻ tín dụng của Quý khách sẽ được bảo mật và được
                     xác nhận với ngân hàng phát hành thẻ.</i>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <ul className='sibling-fade'>
                      {listBank.length > 0 ? _.map(listBank, bank => (
                        <li
                          key={bank.id}
                          title={bank.name}
                          className={classes.bankList}
                          onClick={() => changeBankId(bank.id)}
                        >
                          <img src={bank.logo_url} alt={bank.name} className={classNames(
                            classes.bankImg, {
                              [classes.bankImgFocus]: bank.id === bankId.toString(),
                            },
                          )} />
                          {/* <img src = {bank.logo_url} alt = {bank.name} /> */}
                        </li>
                      )) : <SimpleLoader width={100} />}
                    </ul>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Divider />
            <ExpansionPanel elevation={0} defaultExpanded={!xsMode}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{
                content: classes.alignCenter,
              }}>
                <Hidden xsDown>
                  <img src={Visa} alt='Visa / Mastercard' />
                </Hidden>
                <Typography className={classes.typo}>Thanh toán qua thẻ Visa Mastercard</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Grid container spacing={8}>
                  <Grid item md={12} xs={12}>
                    <ul className={classes.ulBank}>
                      {visa.length > 0 ? _.map(visa, bank => (
                        <li
                          key={bank.id}
                          title={bank.name}
                          className={classes.bankList}
                          onClick={() => changeBankId(bank.id)}
                        >
                          <img src={bank.logo_url} alt={bank.name} className={classNames(
                            classes.bankImg, {
                              [classes.bankImgFocus]: bank.id === bankId.toString(),
                            },
                          )} />
                        </li>
                      )) : <SimpleLoader width={100} />}
                    </ul>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              disabled={lists === null || paymentPending}
              onClick={triggerPayment}
              style={paymentPending ? { backgroundColor: '#ffd495', color: 'black', fontWeight: 700 } : {}}
            >
              {paymentPending ? 'Bạn đang được chuyển sang Bảo Kim để tiếp tục thanh toán' : 'Thanh toán'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BankList);
