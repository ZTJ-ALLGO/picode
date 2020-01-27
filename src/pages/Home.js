import React from 'react';
import { Link } from 'react-router-dom';
import codeImg from '../img/code.png';

export default function Home () {
  return (
    <div className="jumbutron">
      <Link to='/editor'>
        <h1><span className="bg-rose">PI</span>CODE</h1>
      </Link>

      <div style={{ width: '50%' }}>
        <img src={codeImg} alt="code" className="w-100" />
      </div>
    </div>
  )
}
