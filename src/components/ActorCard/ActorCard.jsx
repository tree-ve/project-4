import { Link } from "react-router-dom"


export default function ActorsListPage({ actors }) {
    return (
        <>
            {/* {console.log(actors)} */}
            {actors.map((a, idx) => (
                <Link to={`/actors/${a}`} actor={a} key={a}>
                    <div className="actor-card" key={a.title}>
                        <div>
                            <p className="actor-card-text">{a}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}