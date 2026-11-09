import { useEffect, useState } from "react";
import { FACEBOOK_URL, fetchProducts } from "../api";
import { useCart } from "../context/CartContext";
import packagesBanner from "../images/image copy 4.png";
import basicPackageImage from "../images/image copy 13.png";
import standardPackageImage from "../images/image copy 14.png";
import premiumPackageImage from "../images/image copy 11.png";
import deluxePackageImage from "../images/image copy 12.png";

const fallbackPackages = [
  {
    _id: "basic-package",
    slug: "basic-package",
    name: "Basic Package",
    price: 15000,
    description: ["Simple balloon decoration", "Cake table setup", "Basic backdrop"],
    image: basicPackageImage,
  },
  {
    _id: "standard-package",
    slug: "standard-package",
    name: "Standard Package",
    price: 25000,
    description: ["Balloon decoration", "Cake table", "Birthday backdrop", "Welcome setup"],
    image: standardPackageImage,
  },
  {
    _id: "premium-package",
    slug: "premium-package",
    name: "Premium Package",
    price: 40000,
    description: ["Luxury decoration", "Balloon arch", "Cake table", "Guest seating"],
    image: premiumPackageImage,
  },
  {
    _id: "deluxe-package",
    slug: "deluxe-package",
    name: "Deluxe Package",
    price: 60000,
    description: ["Full event decoration", "Premium backdrop", "Guest seating", "Complete birthday setup"],
    image: deluxePackageImage,
  },
];

const getPackageKey = (product) =>
  product.slug || product.name?.toLowerCase().replace(/\s+/g, "-");

export default function Packages() {
  const { add } = useCart();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const list = products.filter((p) => p.category === "Packages" || p.featured);
  const displayedPackages = fallbackPackages.map((fallback) => {
    const savedPackage = list.find((product) => getPackageKey(product) === fallback.slug);
    return savedPackage
      ? { ...fallback, ...savedPackage, slug: fallback.slug, image: fallback.image }
      : fallback;
  });

  return (
    <>
      <section className="page-hero packages-hero">
        <img
          className="packages-banner-image"
          src={packagesBanner}
          alt="Elegant purple-lit event hall set up for a celebration"
        />
        <div className="hero-copy">
          <h1>BEST COMBINATIONS</h1>
          <p>Being adaptive helps you sail along in today’s ever-changing world.</p>
          <p>Choose as per your needs.</p>
          <a className="btn solid" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
            CUSTOMIZE
          </a>
        </div>
      </section>

      <section className="section">
        <div className="center">
          <h2>PACKAGES</h2>
          <p className="muted">For birthday Parties — add to cart or book on Facebook.</p>
        </div>
        {loading ? (
          <p className="package-status">Latest package details load ho rahe hain; packages neeche available hain.</p>
        ) : null}
        {error ? (
          <p className="package-status">
            Latest details load nahi ho sake ({error}). Neeche available package details dikh rahe hain.
          </p>
        ) : null}
        <div className="packages" style={{ marginTop: 32 }}>
          {displayedPackages.map((product) => {
            const fallbackImage =
              fallbackPackages.find((fallback) => fallback.slug === getPackageKey(product))?.image ||
              basicPackageImage;
            const image = product.image || fallbackImage;

            return (
              <article key={product._id || product.slug} className="package">
                <div className="package-image-wrap">
                  <img
                    className="bg"
                    src={image}
                    alt={`${product.name} package`}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />
                  {product.slug === "standard-package" && (
                    <span className="package-badge">Most Popular</span>
                  )}
                </div>
                <div className="package-copy">
                  <div className="package-info">
                    <div className="package-description">
                      <h3>{product.name}</h3>
                      {Array.isArray(product.description) ? (
                        <ul className="package-features">
                          {product.description.map((feature) => <li key={feature}>{feature}</li>)}
                        </ul>
                      ) : (
                        <p className="package-description-text">{product.description}</p>
                      )}
                    </div>
                    <div className="package-purchase">
                      <p className="package-price">Rs. {Number(product.price).toLocaleString()}</p>
                      <div className="package-actions">
                    <button
                      className="btn red"
                      onClick={() => add({
                        ...product,
                        description: Array.isArray(product.description)
                          ? product.description.join(", ")
                          : product.description,
                        image,
                      })}
                    >
                      BUY NOW
                    </button>
                    <a className="btn ghost-dark" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                      Facebook Booking
                    </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}