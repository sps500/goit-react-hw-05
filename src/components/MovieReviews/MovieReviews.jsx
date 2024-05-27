import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";
import config from "../../config";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${config.BEARER_TOKEN}`,
          },
        }
      );
      setReviews(response.data.results);
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <ul className={styles.list}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={styles.item}>
              <h3 className={styles.author}>Author: {review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
