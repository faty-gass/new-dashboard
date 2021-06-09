import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './components/SignUp.js'
import SignIn from './components/SignIn.js'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
      </Switch>


{/*       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </Router>
  );
}

export default App;
