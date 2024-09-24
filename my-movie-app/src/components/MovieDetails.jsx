import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../App.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "21ef9883c4918f15b2c4e72f7b0e485e";
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=de-DE`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Filmdetails:", error);
      }
    };

    const fetchTrailer = async () => {
      const apiKey = '21ef9883c4918f15b2c4e72f7b0e485e';
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "");
      } catch (error) {
        console.error("Fehler beim Abrufen des Trailers:", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
  }, [id]);

  return (
    <div className="page-container">
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Bewertung: {movie.vote_average}/10</p>
          {trailerUrl ? (
            <ReactPlayer url={trailerUrl} controls />
          ) : (
            <p>Kein Trailer verfügbar</p>
          )}
        </>
      ) : (
        <p>Lade Daten...</p>
      )}
    </div>
  );
}

