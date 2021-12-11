import './index.css';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { ThemeContextProvider } from './contexts/ThemeContext';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <HashRouter>
        <Provider store={store}>
          <ConfigProvider locale={ruRU}>
            <App />
          </ConfigProvider>
        </Provider>
      </HashRouter>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
