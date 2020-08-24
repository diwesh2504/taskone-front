import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import App from './App'
import MainPage from './MainPage';
import'bootstrap/dist/css/bootstrap.min.css';
const ws=new WebSocket("ws://localhost:4040")
export const Context=React.createContext(null);
ReactDOM.render(
  <React.StrictMode>
  <Context.Provider value={{ws}}>
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/page" component={MainPage}/>
      </Switch>
    </Router>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


