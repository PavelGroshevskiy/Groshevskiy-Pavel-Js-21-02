import React from 'react';
import {
  Route, Switch, HashRouter, Redirect,
} from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import Comments from './forms/Comments/Comments';
import {
  ThemeContext,
  ThemeContextProvider,
  ThemeContextState,
} from './contexts/ThemeContext';
import Main from './forms/Main/Main';
import User from './forms/User/User';
import Posts from './forms/Posts/Posts';
import Entry from './forms/Entry/Entry';
// import Posts from './forms/Posts/Posts';

class App extends React.Component {
  render() {
    return (
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {
            (context: Partial<ThemeContextState>) => (
              <HashRouter>
                <div className={`App ${context.darkTheme && 'app__dark'}`}>
                  <div className="body">

                    <div className="wrapper">
                      <Header />

                      <div className="content">
                        {/* Внутри switch будет отрендерен только первый совпавший роут, без него, все совпавшие с path */}
                        <Switch>
                          {/* <Route exact path={'/'/* Содержимое будет отрендерено, если путь соответсвует целиком *!/> */}
                          {/*  <Main /> */}
                          {/* </Route> */}
                          <Route path={'/posts' /* Содержимое будет отрендерено, если соответствует начало пути */}>
                            {/* <Posts /> */}
                            <Posts />
                          </Route>
                          <Route path={'/users' /* Содержимое будет отрендерено, если соответствует начало пути */}>
                            <Comments />
                          </Route>
                          <Route path={'/user/:id' /* Содержимое будет отрендерено, если соответствует начало пути */}>
                            <User />
                          </Route>
                          <Route path="/home">
                            <Main />
                          </Route>
                          <Route path="/entry">
                            <Entry />
                          </Route>
                          <Redirect from="/" to={'/home'/* Использование редиректа */} />
                        </Switch>

                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <ScrollToTop /> */}
              </HashRouter>
            )
          }
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );
  }
}

export default App;
