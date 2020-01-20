import React, { useState } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";

import HeaderEditor from '../components/HeaderEditor';
import HeaderOutput from '../components/HeaderOutput';

export default function Home () {

  const [lang, setLang] = useState(localStorage.getItem('choosed-lang') || 'Python3');
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

  const onRunCode = (value) => {
    setIsRunning(true);
    if (value && Object.keys(value).length > 2) {
      setTimeout(() => {
        setPreview(value);
        setIsRunning(false);
      }, 1000);
    }
  }

  const onSelectLang = (value) => {
    if (value === 'Cpp' || value === 'C' || value === 'Cpp14') {
      value = 'c_cpp'
    }
    setLang(value);
  }

  return (
    <main>
      <div className="editor">
        <HeaderEditor onRunCode={onRunCode} onSelectLang={onSelectLang} />
        <AceEditor
          mode={lang.toLowerCase().replace(/\d/gi, '')}
          theme="monokai"
          onChange={onChange}
          onLoad={onLoad}
          value={code}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ tabSize: 2 }}
        />
      </div>

      <div className="preview">
        <HeaderOutput />
        <div className="prev-box">
          {isRunning ? <div style={{ color: '#2196f3' }}>Running code...</div> : ''}
          {preview && <div style={{ color: '#5cb85c' }}>Finished in {preview.time} ms</div>}
          {preview && <div>{preview.output.split(/\n|\r\n/).map((v, i) => <div className="output" key={v + i}>{v}</div>)}</div>}
          <div style={{ color: '#e40000' }}>{preview.rntError}</div>
        </div>
      </div>

    </main>
  );
}
