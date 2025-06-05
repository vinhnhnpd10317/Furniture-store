import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {

  return (
    <>
      <Router>
        {/* Menu (header) */}
        <Header></Header>

        {/* Nội dung giữa trang */}
        <Routes>
          <Route></Route>
        </Routes>

        {/* Chân trang */}
        <Footer></Footer>
      </Router>
    </>
  )
}

export default App
