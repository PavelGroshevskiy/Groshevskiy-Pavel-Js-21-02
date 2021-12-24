import './index.scss';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <HashRouter>
        <Provider store={store}>
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </Provider>
      </HashRouter>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
