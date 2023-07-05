import { useParams, Link } from "react-router-dom"
import './MovieDetailPage.css';

export default function MovieDetailPage({ movies }) {
    const { title } = useParams();

    return (
        <div className="full-detail">
            {
                movies
                .filter((movie) => movie.title === title)
                .map((movie) => (
                    <div className="full-card" key={ movie.title }>
                        <h2>{movie.title}</h2>
                        <div>
                            <h4>Released: </h4>
                            <p>{movie.releaseDate}</p>
                        </div>
                        <ul>
                            <h4>Cast:</h4>
                        {movie.cast.map((c, idx) => (
                            <li key={c}>
                                <Link to={`/actors/${c}`} className="link" actor={c} key={c}>{c}</Link>
                            </li>
                        ))}
                        </ul>
                        <img src={movie.posterPath} alt={movie.title} />
                    </div>
                ))
            }
        </div>
    )
}