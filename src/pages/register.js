import React from 'react';
import style from './register.module.less';
import Layout from '../components/Layout';
import Register from '../components/Register';

export default () => {
  return (
    <Layout>
      <div className={style.main}>
        <Register />
      </div>
    </Layout>
  );
};
