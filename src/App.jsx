import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/content/Home";
import Contact from "./pages/content/Contact";
import Product from "./pages/content/Product";
import Shop from "./pages/content/Shop";
import VisitUs from "./pages/content/VisitUs";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/admin/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import ProductsList from "./pages/admin/ProductsList";
import AboutUs from "./pages/content/AboutUs";
import Search from "./pages/content/Search";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ArchivedProducts from "./pages/admin/ArchivedProducts";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/Shipping";
import ConfirmOrder from "./pages/cart/ConfirmOrder";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/visit-us" element={<VisitUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
          <Route
            path="/admin/archived-products"
            element={<ArchivedProducts />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
