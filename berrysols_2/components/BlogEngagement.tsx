"use client";

import { FormEvent, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

type Comment = {
  name: string;
  text: string;
};

export default function BlogEngagement() {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = comment.trim();
    if (!text) return;

    setComments((current) => [...current, { name: "You", text }]);
    setComment("");
  }

  return (
    <aside className="blog-engagement" aria-label="Article engagement">
      <div className="blog-engagement-actions">
        <button
          type="button"
          className={`blog-like-button${liked ? " is-liked" : ""}`}
          onClick={() => setLiked((current) => !current)}
          aria-pressed={liked}
          title={liked ? "Unlike this article" : "Like this article"}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        <span className="blog-engagement-count">{liked ? 1 : 0}</span>
      </div>

      <div className="blog-comment-heading">
        <MessageCircle size={17} />
        <span>Leave a comment</span>
      </div>
      <form className="blog-comment-form" onSubmit={submitComment}>
        <label htmlFor="blog-comment">Share your thoughts</label>
        <textarea
          id="blog-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write a comment..."
          rows={4}
        />
        <button type="submit" title="Post comment">
          <Send size={15} />
          <span>Post comment</span>
        </button>
      </form>

      <div className="blog-comment-list" aria-live="polite">
        {comments.length === 0 ? (
          <p className="blog-comment-empty">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((item, index) => (
            <div className="blog-comment" key={`${item.text}-${index}`}>
              <strong>{item.name}</strong>
              <p>{item.text}</p>
            </div>
          ))
        )}
        </div>
    </aside>
  );
}
