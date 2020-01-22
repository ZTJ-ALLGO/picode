import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <div className="jumbutron">
      <h1>MIN<span className="bg-rose">IDE</span></h1>
      <Link to='/editor'><i className="fas fa-play mr-10"></i> start</Link>
    </div>
  )
}
