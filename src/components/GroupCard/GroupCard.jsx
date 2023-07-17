import { Link } from "react-router-dom"

export default function GroupCard({ groups }) {
    return (
        <>
            {/* {console.log(groups)} */}
            {groups.map(group => (
                <Link to={`/groups/${group._id}`} group={group} key={group._id}>
                    <div className="group-card" key={group._id}>
                        <div>
                            <p className="group-card-text">{group.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}