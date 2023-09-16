import "./App.css";
import Trailer from "./components/Trailer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Trailer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
