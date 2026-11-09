import { FACEBOOK_URL } from "../api";

export default function FacebookButton() {
  return (
    <a
      className="fb-float"
      href={FACEBOOK_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Facebook page"
    >
      <span>Chat on Facebook</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.24 10.44 22v-6.99H7.9v-2.94h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.94h-2.34V22C18.34 21.24 22 17.1 22 12.07z" />
      </svg>
    </a>
  );
}