// import { Component } from 'react';
import { useState } from 'react';
// import { newGroup } from '../../utilities/groups-service';
import * as groupsAPI from '../../utilities/groups-api';
import { useNavigate } from 'react-router-dom';

// export default class NewGroupForm extends Component {
//     state = {
//         title: '',
//         users: [this.props.user._id],
//         owner: this.props.user._id,
//         error: ''
//     };

//     // navigate = useNavigate();

//     handleChange = (evt) => {
//         this.setState({
//             [evt.target.name]: evt.target.value,
//             error: ''
//         });
//     };

//     handleSubmit = async (evt) => {
//         evt.preventDefault();
//         try {
//             const formData = { ...this.state};
//             delete formData.error
//             await groupsAPI.newGroup(formData);
//             const groups = await groupsAPI.getGroups();
//             this.props.setGroups(groups)
//             // this.props.navigate('/groups')
//         } catch (error) {
//             console.log(error)
//             this.setState({ error: "Couldn't Create Group - Try Again" });
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <div className="form-container">
//                     <form autoComplete="off" onSubmit={this.handleSubmit}>
//                         <div className="input-field">
//                             <label>Title</label>
//                             <input type="text" name="title" value={this.state.name} onChange={this.handleChange} required />
//                         </div>
//                         <button type="submit">MAKE GROUP</button>
//                     </form>
//                 </div>
//                 <p className="error-message">&nbsp;{this.state.error}</p>
//             </div>
//         );
//     }
// }

export default function NewGroupForm({ groups, setGroups, user }) {
    const [groupFormData, setGroupFormData] = useState({
        title: '',
        users: [user._id],
        owner: user._id,
        error: ''
    });

    const navigate = useNavigate()

    const [error, setError] = useState('');

    function handleChange(evt) {
        setGroupFormData({ ...groupFormData, [evt.target.name]: evt.target.value });
        // console.log(credentials)
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            console.log(groupFormData)
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const group = await groupsAPI.newGroup(groupFormData);
            const newGroups = [...groups, group];
            setGroups(newGroups);
            navigate(`/groups`)
        } catch {
            setError('Group Creation Failed - Try Again');
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>title</label>
                        <input type="text" name="title" value={groupFormData.name} onChange={handleChange} required />
                    </div>
                    <button type="submit">MAKE GROUP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}