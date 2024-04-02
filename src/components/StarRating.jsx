const StarRating = ({ rating, setRating, readOnly = false }) => {
  return (
    <div className="star-rating-container">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            className={`star ${ratingValue <= rating ? "on" : "off"}`}
            onClick={() => !readOnly && setRating(ratingValue)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            disabled={readOnly}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

  export default StarRating;