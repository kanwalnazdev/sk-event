import logo from "../images/spark-kingdom-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <a className="to-top" href="#top" aria-label="Back to top">
        ⌃
      </a>
      <img
        className="footer-logo"
        src={logo}
        alt="Spark Kingdom Birthday Event Planner"
      />
      <p className="muted" style={{ marginTop: 8 }}>
        © Spark Kingdom {new Date().getFullYear()}
      </p>
    </footer>
  );
}