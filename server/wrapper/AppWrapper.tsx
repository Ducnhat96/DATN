import {store} from '@/index';
import {StaticRouter, RouterProps, RouteChildrenProps} from 'react-router';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '@/components/Theme/Theme';
import {Provider} from 'react-redux';
import React, {ComponentType, ReactNode} from 'react';
import {Request} from 'express';
import {WithWidth} from '@material-ui/core/withWidth/withWidth';
import {GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  req: Request
}

interface LocalProps extends IProps, RouterProps, RouteChildrenProps, WithWidth {
  children?: ReactNode
}

// @ts-ignore
const AppWrapper: ComponentType<IProps> = (props: Partial<LocalProps>) => {
  const {req, history, location, width, match} = props;
  return (
    <Provider store = {store}>
      <StaticRouter location = {req!.url} context = {{}}>
        <GlobalContext.Provider value = {{history, location, width, match}}>
          <MuiThemeProvider theme = {theme}>
            {props.children}
          </MuiThemeProvider>
        </GlobalContext.Provider>
      </StaticRouter>
    </Provider>
  );
};

export default AppWrapper
