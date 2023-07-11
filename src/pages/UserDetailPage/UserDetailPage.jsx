// import { useParams, Link } from "react-router-dom"
// import './UserDetailPage.css';

export default function UserDetailPage({ user }) {
    // const { id } = useParams();

    return (
        <div className="full-detail">
            {
                <div>
                    <h2>{user.name}</h2>
                    <h2>{user.email}</h2>
                    <h2>{user._id}</h2>
                </div>
            }
        </div>
    )
}