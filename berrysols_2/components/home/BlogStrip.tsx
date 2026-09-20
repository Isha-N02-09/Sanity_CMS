import Link from "next/link";
import styles from "@/styles/BlogStrip.module.css";
import {homeBlogStrip as blogs} from "@/data/homeContent";

export default function BlogStrip() {
  const track = [...blogs, ...blogs];

  return (
    <div className={styles.serviceStrip}>
      <div className={styles.heading}>
        <span className={styles.line} />
        <h2>Latest Blogs</h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {track.map((blog, index) => (
            <Link
              href={`/blog/${blog.slug}`}
              className={styles.item}
              key={`${blog.title}-${index}`}
            >
              <div>
                <b>{blog.title}</b>
                <p>{blog.description}</p>
              </div>

              <i>→</i>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}