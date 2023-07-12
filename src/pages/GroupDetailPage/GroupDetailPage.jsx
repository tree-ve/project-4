import { useParams, Link } from "react-router-dom"
// import './GroupDetailPage.css';

export default function GroupDetailPage({ groups, user, setUser }) {
    const { id } = useParams();

    return (
        <div className="full-detail">
            {
                groups
                .filter((group) => group._id === id)
                .map((group) => (
                    <div className="full-card" key={ group._id }>
                        <h2>{group.title}</h2>
                        <div>
                            <h4>Owner: </h4>
                            <p><Link to={`/user/${group.owner}`} className="link" user={group.owner} key={group.owner}>{group.owner}</Link></p>
                        </div>
                        <ul>
                            <h4>Users:</h4>
                        {group.users.map(u => (
                            <li key={u}>
                                <Link to={`/user/${u}`} className="link" user={u} key={u}>{u}</Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}