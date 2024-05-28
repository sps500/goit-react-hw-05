import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";
import config from "../../config";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${config.BEARER_TOKEN}`,
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
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  const toggleCast = () => setShowCast((prevShowCast) => !prevShowCast);
  const toggleReviews = () =>
    setShowReviews((prevShowReviews) => !prevShowReviews);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      <div className={styles.detailsContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div className={styles.buttons}>
            <button onClick={toggleCast} className={styles.toggleButton}>
              {showCast ? "Hide Cast" : "Show Cast"}
            </button>
            <button onClick={toggleReviews} className={styles.toggleButton}>
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
          </div>
        </div>
      </div>
      {showCast && <MovieCast movieId={movieId} />}
      {showReviews && <MovieReviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetailsPage;
