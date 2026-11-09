import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../images/spark-kingdom-logo.png";

const links = [
  ["About", "/about"],
  ["Birthday Planning", "/birthday-planning"],
  ["Balloon decoration", "/balloon-decoration"],
  ["Inflatable Rentals", "/inflatable-rentals"],
  ["Services", "/services"],
  ["Packages", "/packages"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <Link className="brand-logo" to="/" aria-label="Spark Kingdom home">
        <img className="brand-logo-image" src={logo} alt="Spark Kingdom Birthday Event Planner" />
      </Link>
      <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Menu">
        ☰
      </button>
      <ul className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        {links.map(([label, to]) => (
          <li key={to}>
            <NavLink to={to}>{label}</NavLink>
          </li>
        ))}
      </ul>
      <Link className="nav-cart" to="/cart">
        Cart <span className="badge">{count}</span>
      </Link>
    </header>
  );
}