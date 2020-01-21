import React, { useState } from 'react';
import HeaderEditor from '../components/HeaderEditor';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import JudgeApi from '../services/JudgeApi';

export default function Home () {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'python');
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [preview, setPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const onLoad = () => {
    let localCode = localStorage.getItem('code');
    if (localCode && localCode.length > 2) {
      setCode(localCode);
    }
  }

  const onChange = (newValue) => {
    setCode(newValue);
    localStorage.setItem('code', newValue);
  }

  const getCodeResult = (value) => {
    setIsRunning(true);
    if (value && Object.keys(value).length > 2) {
      setTimeout(() => {
        setPreview(value);
        setIsRunning(false);
      }, 1000);
    }
  }

  const getFileContent = (value) =>{
    setCode(value);
    localStorage.setItem('code', value);
  }

  const onSelectLang = (value) => {
    setLang(value);
  }

  return (
    <main>
      <div className="editor">
        <HeaderEditor
          sendCodeResult={getCodeResult}
          sendFileContent={getFileContent}
          onSelectLang={onSelectLang}
        />
        <Editor lang={lang} code={code} onChange={onChange} onLoad={onLoad} />
      </div>

      <Preview lang={JudgeApi.getLangName(lang)} preview={preview} isRunning={isRunning} />

    </main>
  );
}
