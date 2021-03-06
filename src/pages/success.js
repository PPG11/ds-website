import React from 'react';
import style from './success.module.less';
import Layout from '../components/Layout';
import successPic from '../images/success.png';

export default () => {
  const handleClick = () => {};
  return (
    <Layout>
      <div className={style.main}>
        <img src={successPic} className={style.pic} />
        <h3 className={style.desc}>报名成功</h3>
        <div
          className={style.btn}
          role="button"
          onClick={handleClick}
          onKeyDown={handleClick}
          tabIndex={0}
        >
          返回首页
        </div>
      </div>
    </Layout>
  );
};
