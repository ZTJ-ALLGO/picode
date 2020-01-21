import React, { useState } from 'react';
import HeaderEditor from '../components/HeaderEditor';
import HeaderOutput from '../components/HeaderOutput';
import Editor from '../components/Editor';
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

      <div className="preview">
        <HeaderOutput lang={lang} />
        <div className="prev-box">
          {isRunning ? <div style={{ color: '#2196f3' }}>Running code...</div> : ''}
          {preview && <div style={{ color: '#5cb85c' }}>Finished in {preview.time} ms</div>}
          {preview && <div>{preview.stdout.split(/\n|\r\n/).map((v, i) => <div className="output" key={v + i}>{v}</div>)}</div>}
          <div style={{ color: '#e40000' }}>{preview.stderr}</div>
        </div>
      </div>

    </main>
  );
}
