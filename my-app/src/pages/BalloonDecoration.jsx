import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import balloonBanner from "../images/image copy 5.png";
import balloonImage from "../images/image copy 10.png";
import balloonGalleryImageOne from "../images/image copy 22.png";
import balloonGalleryImageTwo from "../images/image copy 23.png";
import balloonGalleryImageThree from "../images/image copy 24.png";
import balloonGalleryImagefour from "../images/image copy 25.png";
import balloonGalleryImagefive from "../images/image copy 21.png";
import balloonDecorationVideo from "../images/14612597_1920_1080_24fps (2).mp4";

const balloonImages = [
  { src: balloonImage, alt: "Colorful balloon arch at a birthday celebration" },
  { src: balloonGalleryImageOne, alt: "Balloon wall decoration for a celebration" },
  { src: balloonGalleryImageThree, alt: "Elegant balloon garland for a special occasion" },
  { src: balloonGalleryImageTwo, alt: "Birthday party decorated with balloons" },
  { src: balloonGalleryImagefour, alt: "Colorful balloon installation for a birthday party" },
  { src: balloonGalleryImagefive, alt: "Balloon centerpiece for a special occasion" },
];

export default function BalloonDecoration() {
  const { add } = useCart();
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState("");
  const product = {
    _id: "balloon-decoration",
    slug: "balloon-decoration",
    name: "Balloon Decoration",
    price: 18000,
    image: balloonImage,
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          setVideoError("Video playback could not be started. Please try again.");
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <>
      <section className="page-hero balloon-hero">
        <img
          className="balloon-banner-image"
          src={balloonBanner}
          alt="Balloon decoration with blue, purple and gold balloon arch at a birthday event"
        />
        <h1>Balloon decoration</h1>
      </section>
      <section className="birthday-planning-section">
        <div className="birthday-planning-copy">
          <h2>Arches, garlands and photo walls</h2>
          <p className="muted">
            Gold and blue halls, pastel kids rooms, or a full organic balloon wall. Colors and
            size follow your venue.
          </p>
          <p className="price">Rs. {product.price.toLocaleString()}</p>
          <button className="btn red" onClick={() => add(product)}>
            Add to cart
          </button>
        </div>
        <div className="birthday-celebrations">
          <div className="birthday-image-belt" role="region" aria-label="Balloon decoration photos">
            <div className="birthday-image-belt-track">
              {[0, 1].flatMap((copy) =>
                balloonImages.map((image, index) => (
                  <div className="birthday-image-belt-item" key={`${copy}-${index}`}>
                    <img src={image.src} alt={copy === 0 ? image.alt : ""} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <h2 className="birthday-video-title">Our Celebration</h2>
        <p className="birthday-video-copy">
          Every celebration feels more special with the right balloon decorations. From colorful
          arches and elegant garlands to photo-ready backdrops, we create a setup that suits your
          theme and venue. Enjoy the party with your family while we take care of the details.
        </p>
        <div className="birthday-video-wrap balloon-video-wrap">
          <video
            ref={videoRef}
            className="birthday-feature-video"
            src={balloonDecorationVideo}
            playsInline
            preload="metadata"
            aria-label="Balloon decoration celebration video"
            onPlay={() => {
              setIsVideoPlaying(true);
              setVideoError("");
            }}
            onPause={() => setIsVideoPlaying(false)}
          />
          <button
            className="balloon-video-play"
            type="button"
            onClick={toggleVideoPlayback}
            aria-label={`${isVideoPlaying ? "Pause" : "Play"} balloon decoration celebration video`}
          >
            <span aria-hidden="true">{isVideoPlaying ? "Ⅱ" : "▶"}</span>
          </button>
          {videoError && <p className="balloon-video-error" role="alert">{videoError}</p>}
        </div>
      </section>
    </>
  );
}