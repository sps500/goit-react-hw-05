import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import styles from "./MovieDetailsPage.module.css";
import config from "../../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${config.API_KEY}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      history.push(location.state.from);
    } else {
      history.push("/movies");
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetailsPage;
