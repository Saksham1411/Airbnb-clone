import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
import PlacePage from "./pages/PlacePage";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/:subpage" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
        {/* <Route path="/places/:placeId" element={<PlacePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
