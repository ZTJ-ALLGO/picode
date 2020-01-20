import React,{useState} from 'react'

export default function HeaderOutput ({lang}) {

  const [code, setCode] = useState('');
  const [extension, setExtension] = useState(lang);

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';
    setCode(dType + encodeURIComponent(localStorage.getItem('code')));

    if (lang === 'Python' || lang === 'Python3') setExtension('py');
    else if (lang === 'Csharp') setExtension('cs');
    else if (lang === 'Perl') setExtension('pl');
    else setExtension(lang.toLowerCase());
  }

  return (
    <header>
      <button className="btn bg-dark-btn"><i className="fas fa-terminal"></i> Output</button>
      <a
        href={code}
        onClick={downloadCode}
        download={'code.' + extension}>
        <i className="fas fa-download"></i>
      </a>
    </header>
  )
}