import React from 'react';
import './App.css';
import Comments from './forms/Comments/Comments';
import ComponentWithHelper from './wrappers/ComponentWithHelper';
import { ThemeContextConsumer, ThemeContextState } from './contexts/ThemeContext';
import { ThemeCheckbox } from './components/ThemeCheckbox/ThemeCheckbox';

interface Props {
  className?: string
}

class App extends React.Component<Props> {
  render() {
    return (
      <ThemeContextConsumer>
        {
        (context: Partial<ThemeContextState>) => (
          <div className="App">
            <div className={`body ${context.darkTheme ? 'comment_dark' : ''}`}>
              <div className="content">
                <ComponentWithHelper comment="">
                  <Comments />
                </ComponentWithHelper>
                <ThemeCheckbox />
              </div>
            </div>
          </div>
        )
}
      </ThemeContextConsumer>
    );
  }
}

export default App;
