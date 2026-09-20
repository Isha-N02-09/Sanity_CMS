import { MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutContact() {
  return (
    <section className="about-contact" id="contact">
      <div className="about-contact-shell">
        <div className="about-contact-hero">
          <span className="about-contact-rule" aria-hidden="true" />
          <h2>Contact</h2>
        </div>

        <div className="about-contact-details">
          <div className="about-contact-column">
            <h3>Address</h3>
            <p>Al Falak Apartments,<br />Gujranwala, Pakistan</p>
            <a
              className="about-contact-map-link"
              href="https://www.google.com/maps/search/?api=1&query=Al+Falak+Apartments%2C+Gujranwala%2C+Pakistan"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" size={16} strokeWidth={1.6} />
              How to get
            </a>
            <Link className="about-contact-cta" href="/#contact">
              Project in Mind
            </Link>
          </div>

          <div className="about-contact-column">
            <h3>Phones</h3>
            <div className="about-contact-phone">
              <span>Central sales office</span>
              <a href="tel:+925544519">+92 555 445-15</a>
            </div>
            <div className="about-contact-phone">
              <span>Reception</span>
              <a href="tel:+9249553522">+92 495 257-35-22</a>
            </div>
            <div className="about-contact-phone">
              <span>PR</span>
              <a href="tel:+9249544432">+92 495 345-44-32</a>
            </div>
          </div>

          <div className="about-contact-column">
            <h3>Work schedule</h3>
            <div className="about-contact-hours">
              <span>mon-thurs:</span>
              <strong>10:00 <i /> 22:00</strong>
            </div>
            <div className="about-contact-hours">
              <span>fri:</span>
              <strong>10:00 <i /> 20:00</strong>
            </div>
            <div className="about-contact-hours">
              <span>sat:</span>
              <strong>10:00 <i /> 18:00</strong>
            </div>
          </div>
        </div>

        <div className="about-contact-map">
          <iframe
            title="Map showing the BerrySols office"
            src="https://www.google.com/maps?q=32.1877,74.1945&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
