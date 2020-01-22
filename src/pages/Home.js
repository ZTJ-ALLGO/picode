import React from 'react';
import { Link } from 'react-router-dom';
import PasteEE from '../services/PasteEE';

const LiBin = ({ bin }) => {
  return <li>
    <span>{bin.id} </span>
    <span>{bin.date}</span>
  </li>
}

export default function Home () {
  return (
    <div className="jumbutron">
      <h1>MINIDE</h1>
      <p>Online ide</p>
      <Link to='/editor'>editor</Link>
      <ul>
        {PasteEE && PasteEE.getLocalBins().map(b => <LiBin key={b.id} bin={b} />)}
      </ul>
    </div>
  )
}
