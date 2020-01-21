import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/App.css';
import Home from './pages/Home';
import { GlobalProvider } from './hooks/GlobalProvider';

function App () {

  return (
    <Router>
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </GlobalProvider>
    </Router>
  );
}

export default App;
