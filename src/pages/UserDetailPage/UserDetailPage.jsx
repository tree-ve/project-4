// import { useParams, Link } from "react-router-dom"
import { Link } from "react-router-dom"
// import './UserDetailPage.css';

export default function UserDetailPage({ user, groups }) {
    // const { id } = useParams();
    
    const usersGroups = groups.filter(group => group.users.includes(user._id))

    return (
        <div className="full-detail">
            {
                <div>
                    <h2>{user.name}</h2>
                    <h2>{user.email}</h2>
                    <h2>{user._id}</h2>
                    {usersGroups.map(g => (
                        <li key={g._id}>
                            <Link to={`/groups/${g._id}`} className="link" group={g} key={g._id}>{g.title}</Link>
                        </li>
                    ))}
                </div>
            }
        </div>
    )
}