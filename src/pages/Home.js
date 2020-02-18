import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home () {
  return (
    <div className="jumbutron">
      <Link to='/editor'>
        <h1>PICO<i className="fas fa-play"></i>E</h1>
        <h4 className="p-0 m-0">Write and run some code</h4>
      </Link>
      
      <p>
        Created with <i className="fas fa-coffee"></i> and
        <i className="fas fa-heart ml-5"></i> by <a href="https://github.com/haikelfazzani">Haikel Fazzani</a>
      </p>
    </div>
  )
}
