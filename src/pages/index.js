import React from 'react';
import style from './index.module.less';
import Layout from '../components/Layout';

export default () => {
  return (
    <Layout>
      <div className={style.timer}>
        <h1>这里是主要内容 也可以考虑放广告</h1>
      </div>
    </Layout>
  );
};
