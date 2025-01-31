import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JudgeApi from '../services/JudgeApi';
import SelectLang from '../components/SelectLang';
import LocalSaver from '../util/localStorage';
import ButtonIcon from '../components/ButtonIcon';

export default function HeaderEditor ({ children, sendCodeResult, sendFileContent, onSelectLang }) {

  const [langOptions, setLangOptions] = useState({
    langMode: localStorage.getItem('lang-mode') || 'sh',
    currentLang: localStorage.getItem('choosed-lang') || 'bash',
    langId: localStorage.getItem('lang-id') || 46
  });


  const [disableBtnRun, setdisableBtnRun] = useState(false);
  const refInputFile = useRef();
  const [openInputURL, setopenInputURL] = useState(false);

  const runCode = async () => {
    setdisableBtnRun(true);
    let data = {};
    let localCode = localStorage.getItem('code');

    data = await JudgeApi.getSubmissionResult({
      source_code: localCode,
      language_id: langOptions.langId,
      stdin: ""
    });

    localStorage.setItem('run-response', JSON.stringify(data));
    sendCodeResult(data);
    if (data) { setdisableBtnRun(false); }
  }

  const onLangChange = (e) => {
    let choosedMode = JudgeApi.getModeColor(e.target.value);
    let choosedLang = JudgeApi.getLangNameById(e.target.value);

    onSelectLang(e.target.value);

    setLangOptions({
      langMode: choosedMode,
      currentLang: choosedLang,
      langId: e.target.value
    });

    localStorage.setItem('lang-id', e.target.value);
    localStorage.setItem('lang-mode', choosedMode);
    localStorage.setItem('choosed-lang', choosedLang);
  }

  // fetch from url
  const getUrlContent = async (event) => {
    const fromUrl = event.target.value;
    if (fromUrl && fromUrl.length > 10) {
      const result = await axios.get(fromUrl);
      const content = await result.data;
      sendFileContent(content);
    }
  }

  // open file
  const handleFileSelect = (event) => {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
    localStorage.setItem('file-name', event.target.files[0].name);
  }

  const handleFileLoad = (event) => {
    const fromFile = event.target.result;
    if (fromFile && fromFile.length > 5) {
      sendFileContent(event.target.result);
      LocalSaver.save('files-uploaded-names', {
        filename: localStorage.getItem('file-name'),
        fileContent: fromFile
      });
    }
  }

  return (
    <>
      <header>
        <div className="h-100">
          <Link to='/'><i className="fas fa-home"></i></Link>

          <ButtonIcon
            bclx="btn bg-orange"
            iclx="fas fa-play"
            onClick={runCode}
            txt={langOptions.currentLang.split('(')[0]}
            disabled={disableBtnRun}
          />

          <ButtonIcon
            bclx="btn bg-blue-dark"
            iclx="fas fa-language"
            txt={langOptions.currentLang.split('(')[0]}
          />
        </div>

        <div className="h-100 bl-dark">
          <SelectLang onLangChange={onLangChange} />
          {children}

          <button className="btn" onClick={() => { refInputFile.current.click(); }}>
            <i className="far fa-folder-open"></i>
          </button>

          <button className="btn" onClick={() => {
            setopenInputURL(true);
            setTimeout(() => { setopenInputURL(false); }, 5000);
          }}>
            <i className="fas fa-link"></i>
          </button>
        </div>

        <input type="file" ref={refInputFile} onChange={handleFileSelect} hidden />
      </header>

      <input
        type="text"
        name="fromurl"
        style={{ display: openInputURL ? 'block' : 'none' }}
        onChange={getUrlContent}
        placeholder="Enter code url.."
      />
    </>
  )
}
