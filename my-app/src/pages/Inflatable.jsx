import { useCart } from "../context/CartContext";
import inflatableBanner from "../images/inflatable-rentals-banner.png";
import partyBounceImage from "../images/inflatable-party-bounce.png";

export default function Inflatable() {
  const { add } = useCart();
  const product = {
    _id: "jumping-castle",
    slug: "jumping-castle",
    name: "Jumping Castle Rental",
    price: 15000,
    image:
      "https://www.pumpinjumpincastles.com.au/wp-content/uploads/2023/01/PumpinJumpinHome-scaled.jpg",
  };
  const partyBounce = {
    _id: "party-bounce-fun",
    slug: "party-bounce-fun",
    name: "Party Bounce Fun Rental",
    price: 12000,
    image: partyBounceImage,
  };

  return (
    <>
      <section className="page-hero inflatable-hero">
        <img
          className="inflatable-banner-image"
          src={inflatableBanner}
          alt="Colorful inflatable castle and slide on a sunny lawn"
        />
        <h1>Inflatable Rentals</h1>
      </section>
      <section className="section">
        <p className="muted center inflatable-intro">
          Get ready to bounce, giggle, and make happy birthday memories! Our colorful inflatables
          bring extra fun to parties and special events. For safe play, have an adult nearby, take
          turns, and follow the castle’s age and capacity rules. With a little care, every child
          can enjoy a fun-filled celebration!
        </p>
        <div className="contact-grid inflatable-product">
          <div className="inflatable-product-image">
            <img src={product.image} alt="Kids party inflatables" />
          </div>
          <div>
            <h2>Jumping Castle rentals</h2>
            <p className="muted">
              For children, birthdays, schools and commercial events. Delivery and pickup can be
              arranged with your booking.
            </p>
            <p className="price">Rs. {product.price.toLocaleString()} / day</p>
            <button className="btn red" onClick={() => add(product)}>
              Add to cart
            </button>
          </div>
        </div>
        <div className="contact-grid inflatable-product">
          <div className="inflatable-product-image">
            <img src={partyBounce.image} alt="Colorful party bounce castle at a children's birthday party" />
          </div>
          <div>
            <h2>{partyBounce.name}</h2>
            <p className="muted">
              Colorful bounce castle rental for birthdays and kids’ celebrations.
            </p>
            <p className="price">Rs. {partyBounce.price.toLocaleString()} / day</p>
            <button className="btn red" onClick={() => add(partyBounce)}>
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}