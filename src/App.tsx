import theme from '@/components/Theme/Theme';
import RouteList from '@/routes/Main';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { ComponentType, FC } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Cookies from 'universal-cookie';
import withWidth from '@material-ui/core/withWidth/withWidth';
import { History } from 'history';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GlobalContext } from '@/store/context/GlobalContext';
import { RouteChildrenProps, RouterProps } from 'react-router';

interface AppProps extends RouterProps, RouteChildrenProps {
  history: History
  width: Breakpoint
}

const cookieRefresher = () => {
  const cookies = new Cookies();
  let checkExpireToken = cookies.get('token_expires');

  if (!checkExpireToken && cookies.get('_token')) {
    cookies.set('_token', cookies.get('_token'), {
      maxAge: 1800,
      path: '/',
    });
  }

};

// @ts-ignore
const App: FC = (props: AppProps) => {
  const { history, location, width, match } = props;
  cookieRefresher();
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalContext.Provider value={{ history, location, width, match }}>
        <RouteList />
      </GlobalContext.Provider>
    </MuiThemeProvider>
  );
};

export default compose(
  withRouter,
  withWidth(),
  withCookies,
)(App);
