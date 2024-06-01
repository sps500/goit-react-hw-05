import { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { Suspense } from "react";
import styles from "./MovieDetailsPage.module.css";
import config from "../../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={backLinkLocationRef.current} className={styles.goBackButton}>
          Go Back
        </Link>
      </div>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className={styles.links}>
        <Link
          to="cast"
          state={{ from: location.state?.from }}
          className={styles.link}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: location.state?.from }}
          className={styles.link}
        >
          Reviews
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
