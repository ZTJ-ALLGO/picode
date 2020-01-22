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
      <h1>MIN<span className="bg-rose">IDE</span></h1>
      <Link to='/editor'><i className="fas fa-play mr-10"></i> start</Link>
      <ul>
        {
          PasteEE && PasteEE.getLocalBins()
            .map(b => <LiBin key={b.id} bin={b} />)
        }
      </ul>
    </div>
  )
}
