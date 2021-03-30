/**
 * Base Layout for main pages
 */

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import layoutStyle from './Layout.module.less';

export default ({ children }) => {
  return (
    <div className={layoutStyle.layout}>
      <Header />
      <div className={layoutStyle.main}>{children}</div>
      <Footer /> : <div className={layoutStyle.footer_place} />
    </div>
  );
};
