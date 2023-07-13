import { useParams, Link } from "react-router-dom"
import './GroupDetailPage.css';
import * as groupsAPI from '../../utilities/groups-api'; 
import { useNavigate } from 'react-router-dom';

export default function GroupDetailPage({ groups, setGroups }) {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('groups', groups)
    // console.log('setGroups', setGroups)

    const handleDelete = async (evt, id) => {
        evt.preventDefault();
        console.log('handleDelete')
        // console.log(evt)
        // console.log(id)
        try {
            // const group = await groupsAPI.getGroupById(id)
            // const groups = await groupsAPI.deleteGroup(id);
            console.log(id)
            await groupsAPI.deleteGroup(id);
            // const groups = await groupsAPI.getGroups();
            // setGroups(group)
            setGroups(groups)
            navigate('/groups', {groups});
        } catch (error) {
            console.log(error)
            // this.setState({ error: "Couldn't Create Group - Try Again" });
        }
  	}

    return (
        <div className="full-detail">
            {
                groups
                .filter((group) => group._id === id)
                .map((group) => (
                    <div key={ group._id }>
                        <div className="full-card">
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
                            {/* <button onClick={handleSubmit(group._id)}>{group._id}</button> */}
                        </div>
                        {/* <button onClick={(evt) => handleDelete(evt, group._id)}><Link to="/groups" className="link">DELETE</Link></button> */}
                        <button onClick={(evt) => handleDelete(evt, group._id)}>DELETE</button>
                    </div>
                ))
            }
        </div>
    )
}