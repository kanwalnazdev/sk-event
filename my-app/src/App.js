import { Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Planning from "./pages/BirthdayPlanning";
import Decoration from "./pages/BalloonDecoration";
import Inflatable from "./pages/Inflatable";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/birthday-planning" element={<Planning />} />
        <Route path="/balloon-decoration" element={<Decoration />} />
        <Route path="/inflatable-rentals" element={<Inflatable />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}