import MovieCard from "../../components/MovieCard/MovieCard"
import './MoviesListPage.css';

export default function MoviesListPage({ movies }) {
    return (
        <div className="movie-list">
            <MovieCard movies={movies}/>
        </div>
    )
}