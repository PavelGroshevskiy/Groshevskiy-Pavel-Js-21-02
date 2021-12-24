// Компонент отрисовывающий Подвал
import './Footer.scss';
import React, { useContext, useEffect } from 'react';
import i18next from 'i18next';
import { Radio, RadioChangeEvent } from 'antd';
import moment from 'moment';
import ThemeCheckbox from '../../components/ThemeCheckbox/ThemeCheckbox';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';
import '../../locale/i18next';

const Footer = () => {
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);

  const handleChangeLanguage = (e: RadioChangeEvent) => {
    moment.locale(e.target.value);
    i18next.changeLanguage(e.target.value);
    e.preventDefault();
  };

  useEffect(() => {
    moment.locale(i18next.language);
  }, [i18next.language]);
  return (
    <section className={`footer ${themeContext.darkTheme && 'footer_theme-dark'}`}>
      <div className="footer_copy">Panda Word &copy; 1970-2077</div>
      <Radio.Group
        options={[
          { label: 'En', value: 'en' },
          { label: 'Рус', value: 'ru' },
        ]}
        onChange={handleChangeLanguage}
        defaultValue={i18next.language}
        size="small"
        optionType="button"
        buttonStyle="solid"
      />
      <div className="footer_theme">
        <ThemeCheckbox key="1" />
      </div>
    </section>
  );
};

export default Footer;
