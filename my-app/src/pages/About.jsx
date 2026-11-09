import { Link } from "react-router-dom";
import aboutBanner from "../images/image copy 8.png";

export default function About() {
  return (
    <>
      <section className="page-hero about-hero">
        <img className="about-banner-image" src={aboutBanner} alt="" aria-hidden="true" />
        <h1>About</h1>
      </section>
      <section className="section center">
        <h2>Spark Event Design birthday planning</h2>
        <p className="muted">
        
          We plan birthday parties in Karachi: balloon décor, indoor room setups, themed parties and
          jumping castle rentals. Tell us the age, theme and venue — we handle the rest.
        </p>
        <p className="muted" style={{ marginTop: 16 }}>
          From a small home setup to a full hall bash, the look stays bright, clean and photo-ready.
        </p>
        <div style={{ marginTop: 24 }} className="actions">
          <Link className="btn red" to="/contact" style={{ margin: "0 auto" }}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}