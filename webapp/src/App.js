//import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp.js'
import SignIn from './components/SignIn.js'


function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const setLoggedUser = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  }

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/signin">
          <SignIn logUser={setLoggedUser}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
