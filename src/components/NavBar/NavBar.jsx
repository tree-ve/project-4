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
            <br/>
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </nav>
    )
}