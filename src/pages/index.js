import React from 'react';
import style from './index.module.less';
import Layout from '../components/Layout';

export default () => {
  return (
    <Layout>
      <div className={style.timer}>
        <h1>main page</h1>
      </div>
    </Layout>
  );
};
