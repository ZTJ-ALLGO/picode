import React, { useState } from 'react';
import HeaderEditor from '../containers/HeaderEditor';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import JudgeApi from '../services/JudgeApi';
import HeaderOutput from '../containers/HeaderOutput';
import SelectFont from '../components/SelectFont';
import SideBar from '../components/SideBar';
import Split from 'react-split'

export default function CodeEditor () {

  const [langId, setLangId] = useState(+localStorage.getItem('lang-id') || 46);
  const [langMode, setLangMode] = useState(localStorage.getItem('lang-mode') || 'sh');
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [preview, setPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontsize') || '18px');

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

  const getFileContent = (value) => {
    setCode(value);
    localStorage.setItem('code', value);
  }

  const onSelectLang = (languageId) => {
    setLangMode(JudgeApi.getLangNameById(languageId));
    setLangId(languageId);
  }

  const onFontSizeChange = (e) => {
    setFontSize(e.target.value);
    localStorage.setItem('fontsize', e.target.value);
  }

  return (
    <main>
      <Split
        sizes={[60, 40]}
        gutterSize={5}
        cursor="col-resize"
      >
        <div className="editor">
          <HeaderEditor
            sendCodeResult={getCodeResult}
            sendFileContent={getFileContent}
            onSelectLang={onSelectLang}
          >
            <SelectFont onFontSizeChange={onFontSizeChange} fontSize={fontSize} />
          </HeaderEditor>

          <Editor
            lang={langMode}
            code={code}
            onChange={onChange}
            onLoad={onLoad}
            fontSize={fontSize}
          />
        </div>

        <div className="preview">
          <HeaderOutput lang={JudgeApi.getLangNameById(langId)} isRunning={isRunning} />
          <Preview preview={preview} isRunning={isRunning} />
        </div>
      </Split>
      <SideBar code={code} setCode={setCode} />
    </main>
  );
}
