// Переписан на классовый компонент
import './ThemeCheckbox.css';
import React from 'react';
import { Switch } from 'antd';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

export class ThemeCheckbox extends React.Component {
  cont = { darkTheme: false };

  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <ThemeContext.Consumer>
        {(context: Partial<ThemeContextState>) => (
          <div className="theme_switcher">
            <span className="theme_switcher__label">тема</span>
            <Switch defaultChecked={context.darkTheme} onChange={context.toggleTheme} key="switch" size="small" />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeCheckbox;
