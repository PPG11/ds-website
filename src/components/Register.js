import React, { useState } from 'react';
import classNames from 'classnames';
import Notice from './Notice';
import style from './Register.module.less';

export default () => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [blessings, setBlessings] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const handleCanSubmit = (i1, i2, i3, i4) => {
    if (i1.length * i2.length * i3.length * i4.length !== 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };
  const handleName = e => {
    setName(e.target.value);
    if (e.target.value.length === 0) setCanSubmit(false);
    handleCanSubmit(e.target.value, keywords, blessings, captcha);
  };
  const handleKeywords = e => {
    setKeywords(e.target.value);
    if (e.target.value.length === 0) setCanSubmit(false);
    handleCanSubmit(name, e.target.value, blessings, captcha);
  };
  const handleBlessings = e => {
    setBlessings(e.target.value);
    if (e.target.value.length === 0) setCanSubmit(false);
    handleCanSubmit(name, keywords, e.target.value, captcha);
  };
  const handleCaptcha = e => {
    setCaptcha(e.target.value);
    if (e.target.value.length === 0) setCanSubmit(false);
    handleCanSubmit(name, keywords, blessings, e.target.value);
  };
  const handleSubmit = () => {
    if (canSubmit) {
      if (captcha !== '0000') {
        setShowNotice(true);
      } else {
        console.log('Success!');
      }
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <h2 className={style.title}>我要报名</h2>
        <input
          value={name}
          onChange={handleName}
          placeholder="少侠，请留下姓名"
        />
        <input
          value={keywords}
          onChange={handleKeywords}
          placeholder="2021关键词/Flag，如：买10个 BTC、爆瘦10斤"
        />
        <div className={style.textarea_wrapper}>
          <textarea
            value={blessings}
            onChange={handleBlessings}
            placeholder="请留下对公司的祝福语吧～"
            maxLength="180"
          />
          <div className={style.textarea_count_box}>
            <span className={style.number}>{blessings.length}</span>
            <span className={style.number_all}>/180</span>
          </div>
        </div>
        <input
          value={captcha}
          onChange={handleCaptcha}
          placeholder="查收邮件，输入唯一验证码"
        />
        <div
          className={classNames(
            style.submit,
            canSubmit ? style.can_submit : style.cannot_submit,
          )}
          role="button"
          onClick={handleSubmit}
          onKeyDown={handleSubmit}
          tabIndex={0}
        >
          确认报名
        </div>
        <div className={style.postscript}>
          * 确认报名后信息无法更改，阁下请谨慎！
        </div>
      </div>
      <Notice showNotice={showNotice} setShowNotice={setShowNotice} />
    </>
  );
};
