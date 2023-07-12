import { Link } from "react-router-dom"

export default function GroupCard({ groups }) {
    return (
        <>
            {/* {console.log(groups)} */}
            {groups.map(g => (
                <Link to={`/groups/${g._id}`} group={g} key={g._id}>
                    <div className="group-card" key={g.title}>
                        <div>
                            <p className="group-card-text">{g.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}