import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating = 0, totalStars = 5, size = 24 }) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // If it's .5 or above, show half a star
  const partialStarPercentage = (rating % 1).toFixed(2); // Get the fractional part
  const emptyStars = totalStars - (fullStars + halfStar); // Empty stars

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={index} size={size} className="text-yellow-400" />
      ))}

      {/* Half star */}
      {halfStar === 1 && (
        <FaStarHalfAlt size={size} className="text-yellow-400" />
      )}

      {/* Partial star */}
      {partialStarPercentage > 0 && partialStarPercentage < 1 && (
        <div
          className="relative w-full"
          style={{
            width: `${partialStarPercentage * 100}%`,
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          <FaStar size={size} className="text-yellow-400" />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaStar
          key={index + fullStars + halfStar}
          size={size}
          className="text-gray-300"
        />
      ))}
    </div>
  );
};

export default StarRating;
