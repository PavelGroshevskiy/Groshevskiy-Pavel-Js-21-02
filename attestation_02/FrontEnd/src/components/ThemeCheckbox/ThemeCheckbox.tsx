// Переписан на классовый компонент
import './ThemeCheckbox.scss';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Switch } from 'antd';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

interface Props {
  t: any;
}

class ThemeCheckbox extends React.Component<Props> {
  cont = { darkTheme: false };

  render(): React.ReactNode {
    const { t } = this.props;
    return (
      <ThemeContext.Consumer>
        {(context: Partial<ThemeContextState>) => (
          <div className="theme_switcher">
            <span className="theme_switcher__label">{t('footer.theme-title')}</span>
            <Switch defaultChecked={context.darkTheme} onChange={context.toggleTheme} key="switch" size="small" />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default withTranslation()(ThemeCheckbox);
