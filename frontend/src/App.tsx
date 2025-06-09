import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Component/Header';
import Home from './Component/Home';

function App() {

  return (
    <>
      <Router>
        {/* Menu (header) */}
        <Header></Header>

        {/* Nội dung giữa trang */}
       
          
            <Home />
        
       

        {/* Chân trang */}
        {/* <Footer></Footer> */}
      </Router>
    </>
  )
}

export default App
