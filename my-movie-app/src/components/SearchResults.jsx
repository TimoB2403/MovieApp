import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Stelle sicher, dass du deine CSS-Datei importierst

export default function SearchResults() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const apiKey = '21ef9883c4918f15b2c4e72f7b0e485e';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=de-DE`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Fehler bei der Suche nach Filmen:", error);
    }
  };

  return (
    <div className="page-container">
      <h1>Filmsuche</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nach einem Film suchen"
        />
        <button type="submit">Suchen</button>
      </form>

      <div className="search-results">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-result">
            {movie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={`${movie.title} Poster`} 
                className="movie-poster"
              />
            ) : (
              <div className="no-poster">Kein Bild verfügbar</div>
            )}
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <button onClick={() => navigate(`/movie/${movie.id}`)}>Mehr Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


