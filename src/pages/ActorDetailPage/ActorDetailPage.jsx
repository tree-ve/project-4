import { useParams } from "react-router-dom"
// import './ActorDetailPage.css';
import { movies } from "../../data";
import MovieCard from "../../components/MovieCard/MovieCard"

export default function ActorDetailPage({ actors }) {
    const { actor } = useParams();

    const actorsMovies = movies.filter(movie => movie.cast.includes(actor))

    return (
        <div className="full-detail">
            <h1>
                {actor}
            </h1>
            <div className="movie-list">
                <MovieCard movies={actorsMovies}/>
            </div>
        </div>
    )
}