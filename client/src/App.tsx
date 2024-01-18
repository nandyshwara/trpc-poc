import { Route, Routes } from "react-router-dom";
import AllProducts from "./components/products/AllProducts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<AllProducts/>} />
      </Routes>
    </div>
  );
}

export default App;
