import { Link } from "react-router-dom";
import servicesBanner from "../images/services-banner.png";
import indoorRoomImage from "../images/image copy 6.png";

const items = [
  {
    to: "/birthday-planning",
    title: "Indoor room setups",
    text: "Small birthday party setup at home.",
    img: indoorRoomImage,
  },
  {
    to: "/balloon-decoration",
    title: "Balloon walls",
    text: "Photo-ready arches and frames.",
    img: "https://i.pinimg.com/736x/25/05/1d/25051d65f0ee8026e52549b7ae9065bb.jpg",
  },
  {
    to: "/inflatable-rentals",
    title: "Inflatables",
    text: "Jumping castles for kids events.",
    img: "https://res.cloudinary.com/skyhighpartyrentals/c_fill,w_1200,h_600/media/catalog/product/i/c/ice-cream-water-slide-birthday-party-wide.jpg",
  },
  {
    to: "/packages",
    title: "Full packages",
    text: "BB1, BB2 and Big Birthday Bash.",
    img: "https://balloonartistry.com/wp-content/gallery/magnificent-party-rooms/beach-point-bat-mitzvah.jpg",
  },
];

export default function Services() {
  return (
    <>
      <section className="page-hero services-hero">
        <img
          className="services-banner-image"
          src={servicesBanner}
          alt="Elegant event setup with balloons, flowers, and party tables"
        />
        <h1>Services we offer</h1>
      </section>
      <section className="section">
        <h2>Small Birthday party setup at home</h2>
        <p className="muted">Indoor room setups, décor and rentals — pick a service or a package.</p>
        <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {items.map((item) => (
            <Link key={item.title} to={item.to} className="card hover-zoom">
              <div className="card-media">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="muted">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}