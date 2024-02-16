import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import axios from "axios";
function App() {
  
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Header></Header>
      {/* <Login></Login> */}
    </div>
  );
}

export default App;
