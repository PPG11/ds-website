/**
 * Header Component
 */

import React from 'react';
import headerStyle from './Header.module.less';
import pic from '../images/headerpic.png';

export default () => {
  return (
    <header className={headerStyle.header}>
      <img src={pic} className={headerStyle.logo} />
      <div>123</div>
    </header>
  );
};
