import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/App.css';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';

function App () {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/editor" component={CodeEditor} />
      </Switch>
    </Router>
  );
}

export default App;
