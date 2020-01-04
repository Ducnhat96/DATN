import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig, Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers';
import ReactGA from 'react-ga';

export const windowExist = typeof window !== 'undefined';

const composeEnhancers = (windowExist && process.env.NODE_ENV !== 'production')
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['v_animate', 'booking', 'searchNavMobile'],
};

const persistedReducer: Reducer = windowExist ? persistReducer(persistConfig, rootReducer) : rootReducer;

export const store: Store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk),
));

export const persistor: Persistor = persistStore(store);

const initializeReactGA = () => {
  ReactGA.initialize('UA-134989606-1');
  ReactGA.pageview(
    `/${window.location.pathname} + ${
    window.location.search
    }`
  );
}

const ReduxWrapper = () => (
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);

const AppRoot = () => {
  initializeReactGA();
  return (
    <PersistGate persistor={persistor}>
      <ReduxWrapper />
    </PersistGate>
  );
};

if (windowExist) {
  ReactDOM.hydrate(<AppRoot />, document.getElementById('root'));
  serviceWorker.register();
} else {

}


