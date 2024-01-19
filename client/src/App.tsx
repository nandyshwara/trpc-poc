import { Route, Routes } from "react-router-dom";
import AllProducts from "./components/products/AllProducts";
import DashboardLayout from "./Layout/DashboardLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<DashboardLayout/>}>
        <Route path="/products" element={<AllProducts/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
