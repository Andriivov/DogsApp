import Home from "./components/layout/pages/Home/Home"
import { Route, Routes } from "react-router-dom";
import SavedCards from "./components/layout/pages/Saved/SavedCards";
import Header from "./components/layout/Header/Header";

function App() {

  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedCards />} />
      </Routes>

    </>
  )
}

export default App;
