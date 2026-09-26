export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    title,
    price,
    description,
    category,
    image,
    rating,
  } = product;

  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : `$${price}`;
  const rateValue = rating?.rate !== undefined ? rating.rate : 'N/A';
  const reviewCount = rating?.count !== undefined ? rating.count : 0;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={title || 'Product Image'}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <div className="product-category-row">
          <span className="product-category">{category}</span>
          <div className="product-rating" title={`Rating: ${rateValue} out of 5 (${reviewCount} reviews)`}>
            <span className="star-icon">★</span>
            <span>{rateValue}</span>
            <span className="review-count">({reviewCount})</span>
          </div>
        </div>

        <h2 className="product-title" title={title}>
          {title}
        </h2>

        <p className="product-description" title={description}>
          {description}
        </p>

        <div className="product-footer">
          <div className="product-price-container">
            <span className="price-label">Price</span>
            <span className="product-price">{formattedPrice}</span>
          </div>
          <button
            type="button"
            className="btn-details"
            aria-label={`Buy ${title}`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
