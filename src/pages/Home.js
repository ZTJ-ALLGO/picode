import React, { useState, useEffect, useContext } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { GlobalContext } from '../hooks/GlobalProvider';
import HeaderEditor from '../components/HeaderEditor';
import HeaderOutput from '../components/HeaderOutput';

export default function Home () {

  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');
  const [value, setValue] = useContext(GlobalContext);

  const onLoad = () => {
    setCode(localStorage.getItem('code'));
  }

  function onChange (newValue) {
    setCode(newValue);
    localStorage.setItem('code', newValue);
  }

  useEffect(() => {
    if (value) {
      setPreview(JSON.parse(localStorage.getItem('run-response')));
    }
  }, [value])

  return (
    <main>
      <div className="editor">
        <HeaderEditor />
        <AceEditor
          mode="python"
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
          {preview && <div style={{ color: '#5cb85c' }}>Finished in {preview.time} ms</div>}
          {preview && <div>{preview.output.split(/\n|\r\n/).map((v, i) => <div className="output" key={v + i}>{v}</div>)}</div>}
          <div style={{ color: '#e40000' }}>{preview.rntError}</div>
        </div>
      </div>

    </main>
  );
}
