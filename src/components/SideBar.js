import React, { useEffect, useState } from 'react';
import '../styles/sidebar.css'
import LocalSaver from '../util/localStorage';

export default function SideBar ({ code, setCode }) {

  const [state, setState] = useState([]);
  const [sideIsClosed, setSideIsClosed] = useState(false);

  useEffect(() => {
    setState(LocalSaver.get('files-uploaded-names'))
  }, [code]);

  const getFileContent = (filename) => {
    let localData = LocalSaver.get('files-uploaded-names');
    let content = localData.find(f => f.filename === filename).fileContent;
    setCode(content);
  }

  const removeFile = (filename) => {
    const newFiles = LocalSaver.removeOne('files-uploaded-names', filename);
    setState(newFiles);
  }

  return (
    <div className="sidebar" style={{ marginRight: sideIsClosed ? '-230px' : '0px' }}>
      <div className="btn-close" onClick={() => { setSideIsClosed(!sideIsClosed) }}>
        <i className="fas fa-arrows-alt-h"></i>
      </div>
      <ul>
        <li><i className="fas fa-folder-open"></i> Uploaded Files</li>
        {state && state.map(s =>
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