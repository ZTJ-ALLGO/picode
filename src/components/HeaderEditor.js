import React, { useState, useRef } from 'react';
import RunCode from '../services/RunCode';
import axios from 'axios';

const langs = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];

export default function HeaderEditor ({ sendCodeResult, sendFileContent, onSelectLang }) {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'Python3');
  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);
  const [disableBtnRun, setdisableBtnRun] = useState(false);
  const refInputFile = useRef();

  const [openInputURL, setopenInputURL] = useState(false);

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

  // fetch from url
  const getUrlContent = async (event) => {
    const fromUrl = event.target.value;
    if (fromUrl && fromUrl.length > 10) {
      const result = await axios.get(fromUrl);
      const content = await result.data;
      setCode(content);
      sendFileContent(content);
    }
  }

  // open file
  const handleFileSelect = (event) => {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }

  const handleFileLoad = (event) => {
    const fromFile = event.target.result;
    if (fromFile && fromFile.length > 5) {
      sendFileContent(event.target.result);
      setCode(event.target.result);
    }
  }

  const openFile = () => {
    refInputFile.current.click();
  }

  return (
    <>
      <header>
        <div className="h-100">
          <button className="btn bg-dark-btn"><i className="fas fa-language"></i> {lang}</button>
        </div>

        <div className="h-100">
          <button className="btn bg-dark-btn" onClick={runCode} disabled={disableBtnRun}>
            <i className="fas fa-play"></i>
          </button>

          <select onChange={onLangChange} value={lang}>
            {langs.map(l => <option value={l} key={l}>{l}</option>)}
          </select>          

          <button className="btn" onClick={openFile}>
            <i className="far fa-folder-open"></i>
          </button>

          <button className="btn" onClick={() => { setopenInputURL(!openInputURL) }}>
            <i className="fas fa-link"></i>
          </button>

          <a
            href={code}
            className="btn"
            onClick={downloadCode}
            download={'code.' + extension}>
            <i className="fas fa-download"></i>
          </a>
        </div>

        <input type="file" ref={refInputFile} onChange={handleFileSelect} hidden />
      </header>
      <input type="text" name="fromurl"
        style={{ display: openInputURL ? 'block' : 'none' }}
        onChange={getUrlContent}
        placeholder="Enter code url.." />
    </>
  )
}
