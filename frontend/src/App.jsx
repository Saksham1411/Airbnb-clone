import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
import PlacePage from "./pages/PlacePage";
import IndexPage from "./pages/IndexPage";
import CancelPayment from "./pages/CancelPayment";
function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND;
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cancel" element={<CancelPayment />} />
        <Route path="/account/:subpage" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
        <Route path="/places/:placeId" element={<PlacePage />} />
      </Routes>
    </div>
  );
}

export default App;
