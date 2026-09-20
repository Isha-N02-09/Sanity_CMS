type CategoryBarProps = {
  label: string;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  items: Array<{ category: string; [key: string]: any }>;
};

export default function CategoryBar({
  label,
  categories,
  activeCategory,
  onSelectCategory,
  items,
}: CategoryBarProps) {
  return (
    <section className="blog-category-bar" aria-label={`${label} categories`}>
      <span className="blog-category-label">{label}</span>
      <div className="blog-filters">
        {categories.map((category) => {
          const count =
            category === "All"
              ? items.length
              : items.filter((item) => item.category === category).length;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              className={isActive ? "is-active" : ""}
              aria-pressed={isActive}
              onClick={() => onSelectCategory(category)}
            >
              {category} <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
