import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import birthdayBanner from "../images/image copy 3.png";
import birthdayVideo from "../images/15921995-uhd_3840_2160_25fps.mp4";
import celebrationImageOne from "../images/image copy 15.png";
import celebrationImageTwo from "../images/image copy 18.png";
import celebrationImageThree from "../images/image copy 16.png";
import celebrationImagefour from "../images/image copy 17.png";
import celebrationImagefive from "../images/image copy 19.png";
import celebrationImageSix from "../images/image copy 20.png";
const celebrationImages = [
  { src: celebrationImageOne, alt: "Cozy indoor birthday party setup" },
  { src: celebrationImageTwo, alt: "Colorful balloon decorations for a birthday" },
  { src: celebrationImageThree, alt: "Birthday celebration balloon wall" },
  { src: celebrationImagefour, alt: "Cozy indoor birthday party setup" },
  { src: celebrationImagefive, alt: "Colorful balloon decorations for a birthday" },
  {src: celebrationImageSix, alt: "Birthday celebration balloon wall" },
];

export default function BirthdayPlanning() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState("");

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
      <section className="page-hero birthday-hero">
        <img
          className="birthday-banner-image"
          src={birthdayBanner}
          alt="Birthday hall decorated with a pink balloon arch, warm lights and a cake table"
        />
        <h1>Birthday Planning</h1>
      </section>
      <section className="birthday-planning-section">
        <div className="birthday-planning-copy">
          <h2>Themed Birthday Parties</h2>
          <p>
            Princess, superhero, cartoon or your own custom idea—we plan the decorations,
            cake table and entrance to make the celebration feel special.
          </p>
          <Link className="btn red" to="/contact">Book Your Theme</Link>
        </div>
        <div className="birthday-celebrations">
          <div className="birthday-image-belt" role="region" aria-label="Birthday celebration photos">
            <div className="birthday-image-belt-track">
              {[0, 1].flatMap((copy) =>
                celebrationImages.map((image, index) => (
                  <div className="birthday-image-belt-item" key={`${copy}-${index}`}>
                    <img src={image.src} alt={copy === 0 ? image.alt : ""} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <h2 className="birthday-video-title">Birthday Party Inspiration</h2>
        <p className="birthday-video-copy">
          Every great birthday begins with your child’s favorite theme. We plan the colors,
          decorations, balloons, and cake table to bring that idea to life. Our team arranges each
          detail to make the venue feel festive, welcoming, and picture-perfect. From the first
          decoration to the final finishing touch, we take care of the setup. You enjoy the
          celebration while your little one makes memories to cherish.
        </p>
        <div className="birthday-video-wrap balloon-video-wrap">
          <video
            ref={videoRef}
            className="birthday-feature-video"
            src={birthdayVideo}
            playsInline
            preload="metadata"
            aria-label="Birthday party inspiration video"
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
            aria-label={`${isVideoPlaying ? "Pause" : "Play"} birthday party inspiration video`}
          >
            <span aria-hidden="true">{isVideoPlaying ? "Ⅱ" : "▶"}</span>
          </button>
          {videoError && <p className="balloon-video-error" role="alert">{videoError}</p>}
        </div>
      </section>
    </>
  );
}