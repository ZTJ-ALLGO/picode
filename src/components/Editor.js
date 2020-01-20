import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";

export default function Editor ({lang, code, onChange, onLoad}) {
  return (
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
  )
}
