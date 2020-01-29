import React, { useEffect, useState } from 'react';
import '../styles/sidebar.css'
import LocalSaver from '../util/localStorage';

export default function SideBar ({ code, setCode }) {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sideIsClosed, setSideIsClosed] = useState(false);

  useEffect(() => {
    setUploadedFiles(LocalSaver.get('files-uploaded-names'));    
  }, [code]);

  const getFileContent = (filename) => {
    let localData = LocalSaver.get('files-uploaded-names');
    let content = localData.find(f => f.filename === filename).fileContent;
    setCode(content);
  }

  const removeFile = (filename) => {
    let newFiles = LocalSaver.removeOne('files-uploaded-names', filename);        
    setUploadedFiles(newFiles);
  }

  return (
    <div className="sidebar" style={{ marginRight: sideIsClosed ? '-232px' : '0px' }}>

      <div className="btn-close" onClick={() => { setSideIsClosed(!sideIsClosed) }}
        style={{ display: sideIsClosed ? 'flex' : 'none' }}>
        <i className="fas fa-arrows-alt-h"></i>
      </div>

      <ul className="h-100">
        <li onClick={() => { setSideIsClosed(!sideIsClosed) }}>
          <span>
            <span className="circle">{uploadedFiles && uploadedFiles.length}</span>Files
          </span>
          <i className="fas fa-hand-point-right mr-10"></i>
        </li>

        {uploadedFiles && uploadedFiles.map(s =>
          <li key={s.filename}>
            <span onClick={() => getFileContent(s.filename)}>
              <i className="fas fa-file-code mr-10"></i> {s.filename}
            </span>
            <button onClick={() => removeFile(s.filename)} className="btn-rm">
              <i className="far fa-trash-alt"></i>
            </button>
          </li>
        )}

      </ul>
    </div>);
}