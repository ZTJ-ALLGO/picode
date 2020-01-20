import React, { useState, useRef } from 'react';
import RunCode from '../services/RunCode';

const langs = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];

export default function HeaderEditor ({ sendCodeResult, sendFileContent, onSelectLang }) {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'Python3');
  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);
  const [disableBtnRun, setdisableBtnRun] = useState(false);
  const refInputFile = useRef();

  const runCode = async () => {
    setdisableBtnRun(true);
    let data = {};
    data = await RunCode.run(lang, localStorage.getItem('code'));
    localStorage.setItem('run-response', JSON.stringify(data));
    sendCodeResult(data);
    if (data) { setdisableBtnRun(false); }
  }

  const onLangChange = (e) => {
    let choosedLang = e.target.value;
    onSelectLang(choosedLang);
    setLang(choosedLang);
    localStorage.setItem('choosed-lang', choosedLang);
  }

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';
    setCode(dType + encodeURIComponent(localStorage.getItem('code')));

    if (lang === 'Python' || lang === 'Python3') setExtension('py');
    else if (lang === 'Csharp') setExtension('cs');
    else if (lang === 'Perl') setExtension('pl');
    else setExtension(lang.toLowerCase());
  }

  // open file
  const handleFileSelect = (event) => {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }

  const handleFileLoad = (event) => {
    sendFileContent(event.target.result)
    setCode(event.target.result);
  }

  const openFile = () => {
    refInputFile.current.click();
  }


  return (
    <header>
      <div className="h-100">
        <button className="btn"><i className="fas fa-language"></i> {lang}</button>
      </div>

      <div className="h-100">
        <button className="btn bg-green" onClick={runCode} disabled={disableBtnRun}>
          <i className="fas fa-play"></i>
        </button>

        <select onChange={onLangChange} value={lang}>
          {langs.map(l => <option value={l} key={l}>{l}</option>)}
        </select>

        <a
          href={code}
          className="btn bg-blue"
          onClick={downloadCode}
          download={'code.' + extension}>
          <i className="fas fa-download"></i>
        </a>

        <button className="btn bg-green" onClick={openFile}>
          <i className="fas fa-file"></i>
        </button>
      </div>

      <input type="file" ref={refInputFile} onChange={handleFileSelect} hidden />

    </header>
  )
}
