import {homeReviews as reviews} from "@/data/homeContent";

function Card({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="review-card">
      <p className="review-quote">“{review.quote}”</p>
      <footer>
        <span className="review-avatar">{review.initials}</span>
        <b>{review.name}<small>{review.title}</small></b>
        <em>{review.company}</em>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  const loop = [...reviews, ...reviews];

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-head">
        <h2>What clients say</h2>
        <p>Real feedback from the people, companies and industries running Berry Solutions in production.</p>
      </div>
      <div className="reviews-viewport">
        <div className="reviews-track">
          {loop.map((review, index) => (
            <Card review={review} key={`${review.name}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
