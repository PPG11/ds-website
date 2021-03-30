import React from 'react';
import style from './login.module.less';
import Layout from '../components/Layout';
import Login from '../components/Login';

export default () => {
  return (
    <Layout>
      <div className={style.main}>
        <Login />
      </div>
    </Layout>
  );
};
