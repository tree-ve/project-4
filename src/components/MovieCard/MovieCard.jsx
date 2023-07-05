import { Link } from "react-router-dom"

export default function MoviesListPage({ movies }) {
    return (
        <>
            {/* {console.log(movies)} */}
            {movies.map((m, idx) => (
                <Link to={`/movies/${m.title}`} movie={m} key={m.title}>
                    <div className="movie-card" key={m.title}>
                        <img src={m.posterPath} alt={m.title} />
                        <div>
                            <p className="movie-card-text">{m.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}