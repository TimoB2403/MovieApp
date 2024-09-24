import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "21ef9883c4918f15b2c4e72f7b0e485e";
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=de-DE&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // Basis-URL für die Bilder

  return (
    <div className="container">
      <h1>Beliebte Filme</h1>
      
      <button onClick={handleSearchClick} className="search-button">
        Zur Suche
      </button>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
            <div className="details">
              <h2>{movie.title}</h2>
              <Link to={`/movie/${movie.id}`}>Mehr Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

