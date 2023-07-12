import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, handleCheckToken }) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }
    return (
        <nav>
            <Link to="/movies" className="link">Movies</Link>
            &nbsp; | &nbsp;
            <Link to="/actors" className="link">Actors</Link>
            &nbsp; | &nbsp;
            <Link to="/groups" className="link">Groups</Link>
            <br/>
            <br/>
            <span><Link to={`/user/${user._id}`} className="link" user={user} key={user._id}>Welcome, {user.name}</Link></span>
            <br/>
            <br/>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            <br/>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
            <br/>
            <br/>
        </nav>
    )
}