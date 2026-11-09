import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import purpleimage from "../images/image.png";
import heroImage from "../images/home-hero.png";
import birthdayHallImage from "../images/image copy.png";
const heroSlides = [purpleimage, heroImage, birthdayHallImage];

const services = [
  {
    to: "/inflatable-rentals",
    title: "Jumping Castle rentals",
    text: "Castles for children, birthdays, HAPPY days, schools, commercial events and other celebrations.",
    img: "https://res.cloudinary.com/skyhighpartyrentals/c_fill,w_1200,h_600/media/catalog/product/i/c/ice-cream-water-slide-birthday-party-wide.jpg",
  },
  {
    to: "/birthday-planning",
    title: "Themed Birthday Parties",
    text: "Start with a theme — Disney princesses, superheroes and more stay popular and always in fashion.",
    img: "https://www.magnifiscience.org/wp-content/uploads/2022/10/DSC_5715.jpg",
  },
  {
    to: "/balloon-decoration",
    title: "Balloons Decoration",
    text: "Your loved one is a year older. Make the day worth remembering — we are just a call away.",
    img: "https://www.bookmyballoons.in/wp-content/uploads/2018/06/Birthday-Party-Balloon-Decoration.jpg",
  },
];

const gallery = [
  "https://balloonartistry.com/wp-content/gallery/magnificent-party-rooms/beach-point-bat-mitzvah.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4Z7JbC6Xf8bk90YpD3Lf4QF8x9lZhs-chEat3jkhNnBkXE26mQ5XSNw&s=10",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU3GuMLZIC8HGrXqGuqCoDu-guWMntWPs04tJOF9dcX9iwytUy",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHPs2fObnyFhljpOss24lj7E9wK4KcmWT4kCMPa6jTDW3sIum",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80",
  "https://img.magnific.com/premium-photo/party-space-ready-online-celebration_776674-975104.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images.unsplash.com/photo-1631857455684-a54a2f03665f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDXDHy9-hZyW4rDtZ5u4hltxRaOARffA94DPNt66bmOAYQDY-bRfBf0eo&s=10",
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideInterval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(slideInterval);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-slides" aria-hidden="true">
          {heroSlides.map((image, index) => (
            <img
              key={image}
              className={`hero-slide${index === activeSlide ? " active" : ""}`}
              src={image}
              alt=""
            />
          ))}
        </div>
        <div className="hero-copy">
          <h1>
            <span>Make Their Birthday</span>
            <span className="hero-title-accent">Unforgettable</span>
          </h1>
          <p className="hero-description">
            Beautiful decorations, joyful moments, and thoughtful planning — all in one place.
          </p>
          <Link className="btn hero-btn" to="/services">
            <span>Explore our services</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section center">
        <h2>Our Vision @ Spark Event Design</h2>
        <p className="muted">
          We help you see the celebration clearly, then build a complete plan — décor, inflatables,
          themes and timing — so the party feels as good as you imagined.
        </p>
        <div style={{ marginTop: 22 }}>
          <Link className="btn home-learn-more" to="/about">
            Learn more about us
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="center">
          <h2>Services</h2>
        </div>
        <div className="grid-3">
          {services.map((item) => (
            <Link key={item.title} to={item.to} className="card hover-zoom">
              <div className="card-media">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="muted">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center">
          <h2>Gallery</h2>
          <p className="muted">Party setups, balloon walls and indoor rooms.</p>
          <p className="muted">Discover decorations for every kind of party and make happy memories with your family.</p>
        </div>
        <div className="gallery" style={{ marginTop: 28 }}>
          {gallery.map((src) => (
            <div className="tile" key={src}>
              <img src={src} alt="Event gallery" />
            </div>
          ))}
        </div>
      </section>

      <section className="section center">
        <h2>Instagram</h2>
        <p className="muted">#party #bdaypk #fevent</p>
        <div style={{ marginTop: 18 }}>
          <Link className="btn red" to="/packages">
            See packages
          </Link>
        </div>
      </section>
    </>
  );
}