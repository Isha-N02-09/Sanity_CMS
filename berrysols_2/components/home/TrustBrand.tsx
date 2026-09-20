import {homeLogos as clientLogos} from "@/data/homeContent";

export default function TrustBrand() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="trust-band">
      <div className="logo-strip" aria-label="Trusted brands">
        <div className="logo-track">
          {logos.map((logo, i) => (
            <div className="logo-item" key={logo.name + i}>
              <img
                src={logo.src}
                alt={logo.name}
                className="logo-track-img"
              />
              <span className="logo-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}