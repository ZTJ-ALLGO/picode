import React, { useState } from 'react';
import RunCode from '../services/RunCode';

const langs = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];

export default function HeaderEditor ({ onRunCode, onSelectLang }) {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'Python3');

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

  return (
    <header>
      <button className="btn" onClick={runCode}>run code</button>
      <div className="h-100">
        <button className="btn">Language : {lang}</button>
        <select onChange={onLangChange} className="bg-rose">
          {langs.map(l => <option value={l} key={l}>{l}</option>)}
        </select>
      </div>
    </header>
  )
}
