import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";

import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";

import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-haskell";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-ocaml";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-pascal";

import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";

import JudgeApi from '../services/JudgeApi';

export default function Editor ({ lang, code, onChange, onLoad, fontSize }) {
  return (
    <AceEditor
      mode={JudgeApi.getModeColorByName(lang)}
      theme="monokai"
      onChange={onChange}
      onLoad={onLoad}
      value={code}
      fontSize={fontSize}
      showPrintMargin={false}
      showGutter={true}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{
        $blockScrolling: Infinity
      }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        tabSize: 2
      }}
    />
  )
}
