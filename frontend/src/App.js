import React, { usestate } from "react";
import './App.css';
import Login from './components/Login';

function App() {

  const [usernameReg, setUsernameReg] = usestate('');
  const [uspasswordReg, setPasswordReg] = usestate('');


  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
