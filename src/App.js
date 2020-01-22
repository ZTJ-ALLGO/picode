import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/App.css';
import Home from './pages/Home';
import { GlobalProvider } from './hooks/GlobalProvider';
import PasteEE from './services/PasteEE';

PasteEE.createBin()
.then(r=>{console.log(r);
})
.catch(e=>{console.log(e);
})

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
