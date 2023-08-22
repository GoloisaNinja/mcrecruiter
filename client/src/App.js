import React, { useState } from "react";
import './App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import CandidateInfo from "./components/CandidateInfo";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function handleLoginSuccess() {
    setLoggedIn(true);
    setCurrentForm('candidateInfo');
  }

  return (
      <div className="App">
        {
          !loggedIn ? (
              currentForm === "login" ? <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} /> : <Register onFormSwitch={toggleForm} />
          ) : (
              <CandidateInfo onFormSwitch={toggleForm} />
          )
        }
      </div>
  );
}

export default App;
