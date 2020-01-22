import React, { useState } from 'react';
import JudgeApi from '../services/JudgeApi';

export default function HeaderOutput ({ lang }) {

  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';
    setCode(dType + encodeURIComponent(localStorage.getItem('code')));

    setExtension(JudgeApi.getLangExtension(localStorage.getItem('lang-id')));
  }

  return (
    <header>
      <button className="btn bg-dark-btn">
        <i className="fas fa-terminal"></i> Language: {lang}
      </button>
      <a
        href={code}
        onClick={downloadCode}
        download={'code.' + extension}>
        <i className="fas fa-download"></i>
      </a>
    </header>
  )
}