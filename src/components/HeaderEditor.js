import React, { useState } from 'react';
import RunCode from '../services/RunCode';

const langs = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];

export default function HeaderEditor ({ onRunCode, onSelectLang }) {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'Python3');
  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);

  const runCode = async () => {
    const data = await RunCode.run(lang, localStorage.getItem('code'));
    localStorage.setItem('run-response', JSON.stringify(data));
    onRunCode(data);
  }

  const onLangChange = (e) => {
    let choosedLang = e.target.value;
    onSelectLang(choosedLang);
    setLang(choosedLang);
    localStorage.setItem('choosed-lang', choosedLang);
  }

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';
    setCode(dType + localStorage.getItem('code'));

    if (lang === 'Python' || lang === 'Python3') setExtension('py');
    else if (lang === 'Csharp') setExtension('cs');
    else if (lang === 'Perl') setExtension('pl');
    else setExtension(lang.toLowerCase());
  }

  return (
    <header>
      <div className="h-100">
        <button className="btn"><i className="fas fa-language"></i> {lang}</button>
      </div>

      <div className="h-100">
        <button className="btn bg-green" onClick={runCode}><i className="fas fa-play"></i></button>
        <select onChange={onLangChange} value={lang}>
          {langs.map(l => <option value={l} key={l}>{l}</option>)}
        </select>
        <a
          href={encodeURIComponent(code)}
          className="btn bg-blue"
          onClick={downloadCode}
          download={'code.' + extension}>
          <i className="fas fa-download"></i>
        </a>
      </div>

    </header>
  )
}
