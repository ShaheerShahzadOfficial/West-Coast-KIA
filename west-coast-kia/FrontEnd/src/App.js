// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Footer from "./Config/Footer";
import { Navbar } from "react-responsive-navbar-overlay";
import Header from './Config/Header';
import About from './Components/About/About';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar
        brand={"West Coast KIA"}
        links={[
          { text: "Home", link: "/" },
          { text: "About", link: "/about" },
          { text: "Cars", link: "/cars" },
          { text: "Shopping", link: "/shopping" },
          { text: "Contact", link: "/contact" },

        ]}
      /> */}
      <Header/>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
