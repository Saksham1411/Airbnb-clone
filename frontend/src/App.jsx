import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        {/* <Route path="/account/" element={<AccountPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
