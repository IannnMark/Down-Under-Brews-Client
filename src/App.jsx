import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Content/Home";
import AboutUs from "./pages/content/Aboutus";
import Contact from "./pages/content/Contact";
import Product from "./pages/content/Product";
import Shop from "./pages/content/Shop";
import VisitUs from "./pages/content/VisitUs";
import SignIn from "./pages/user/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/visit-us" element={<VisitUs />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
