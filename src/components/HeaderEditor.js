import React, { useState, useEffect, useContext } from 'react';
import RunCode from '../services/RunCode';
import { GlobalContext } from '../hooks/GlobalProvider';

const langs = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];

export default function HeaderEditor () {

  const [isRunning, setIsRunning] = useState(false);
  const [lang, setLang] = useState('C')
  const [value, setValue] = useContext(GlobalContext);

  const runCode = async () => {
    const data = await RunCode.run('python3', localStorage.getItem('code'));
    localStorage.setItem('run-response', JSON.stringify(data));
    setIsRunning(true)
    setTimeout(() => { setIsRunning(false); }, 300);
  }

  const onLang = (e)=>{
    setLang(e.target.value);    
  }

  useEffect(() => {
    setValue(isRunning)
  }, [isRunning, setIsRunning])

  return (
    <header>
      <button className="btn" onClick={runCode}>run code</button>
      <select onChange={onLang}>
        {langs.map(l=> <option value={l} key={l}>{l}</option>)}
      </select>
    </header>
  )
}
