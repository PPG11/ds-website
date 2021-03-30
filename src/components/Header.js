/**
 * Header Component
 */

import React from 'react';
import { Link } from 'gatsby';
import headerStyle from './Header.module.less';
import pic from '../images/headerpic.png';

export default () => {
  return (
    <header className={headerStyle.header}>
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <Link className={`navbar-brand`} to="/" title="返回主页">
            <img src={pic} className={headerStyle.logo} alt="logo" />
          </Link>
          <div className={`d-flex justify-content-end ${headerStyle.navdiv}`}>
            <ul
              className={`navbar-nav justify-content-center ${headerStyle.mainnav}`}
            >
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/search"
                  activeClassName="active"
                >
                  账号搜索
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/upload"
                  activeClassName="active"
                >
                  我要挂号
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/estimate"
                  activeClassName="active"
                >
                  估价服务
                </Link>
              </li>
            </ul>
            <div
              className={`d-flex align-items-center justify-content-center ${headerStyle.login}`}
            >
              <Link className="nav-link" to="/login" activeClassName="active">
                注册/登陆
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
