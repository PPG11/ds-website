/**
 * Footer Component
 */

import React from 'react';
import footerStyle from './Footer.module.less';

export default () => {
  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.thanks}>特别鸣谢：我自己</div>
      <div className={footerStyle.postscript}>
        power by Aliyun@网站 ICP 备案编号
      </div>
    </footer>
  );
};
