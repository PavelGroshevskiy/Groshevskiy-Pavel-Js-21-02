// Компонент отрисовывающий Подвал
import './Footer.scss';
import React, { useContext } from 'react';
import { ThemeCheckbox } from '../../components/ThemeCheckbox/ThemeCheckbox';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const Footer = () => {
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);
  return (
    <section className={`footer ${themeContext.darkTheme && 'footer_theme-dark'}`}>
      <div className="footer_copy">Blogs &copy; 1970-2077</div>
      <div className="footer_theme">
        <ThemeCheckbox key="" />
      </div>
    </section>
  );
};

export default Footer;
