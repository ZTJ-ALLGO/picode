import React, { useState } from 'react';
import JudgeApi from '../services/JudgeApi';

export default function HeaderOutput ({ lang,isRunning }) {

  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';
    setCode(dType + encodeURIComponent(localStorage.getItem('code')));
    setExtension(JudgeApi.getLangExtension(localStorage.getItem('lang-id')));
  }

  return (
    <header>
      <button className={isRunning ? "btn bg-green" :"btn bg-blue-dark"}>
        <i className="fas fa-terminal"></i> {lang}
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