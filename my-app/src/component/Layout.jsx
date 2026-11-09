import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FacebookButton from "./FacebookButton";

export default function Layout() {
  return (
    <div id="top">
      <Navbar />
      <Outlet />
      <Footer />
      <FacebookButton />
    </div>
  );
}                                       