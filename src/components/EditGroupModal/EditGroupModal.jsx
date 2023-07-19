import { useState } from 'react';
import * as groupsAPI from '../../utilities/groups-api';
// import { useNavigate } from 'react-router-dom';

export default function EditGroupModal({ group, setEditIsOpen }) {
    const [groupEditData, setGroupEditData] = useState({
        title: group.title,
        users: group.users,
        owner: group.owner,
        addedUserEmail: '',
        error: ''
    });

    // const navigate = useNavigate()
    // console.log('EditGroupModal')
    const [error, setError] = useState('');

    function handleChange(evt) {
        setGroupEditData({ ...groupEditData, [evt.target.name]: evt.target.value });
        // console.log(credentials)
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            // console.log('groupEditData -> ', groupEditData)
            setGroupEditData(groupEditData)
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            // const editGroupData = await groupsAPI.editGroup(group._id, groupEditData);
            await groupsAPI.editGroup(group._id, groupEditData);
            // const newGroups = [...groups, group];
            // console.log('editGroupData -> ', editGroupData)
            // setGroups(newGroups);
            setEditIsOpen(false)
            // navigate(`/groups`)
        } catch {
            setError('Group Creation Failed - Try Again');
        }
    }

    return (
        <div>
            <div className="darkBG" onClick={() => setEditIsOpen(false)} />
            {/* <div className="centered">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>title</label>
                        <input type="text" name="title" value={groupEditData.name} onChange={handleChange} required />
                    </div>
                    <button type="submit">SAVE CHANGES</button>
                </form>
            </div> */}
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Edit Group</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setEditIsOpen(false)}>
                        X
                    </button>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="ModalContent">
                            <div className="input-field">
                                <label>title</label>
                                <input type="text" name="title" value={groupEditData.title} onChange={handleChange} required />
                            </div>
                            {/* <button type="submit">SAVE CHANGES</button> */}
                        </div>
                        <div className="modalActions">
                            <div className="actionsContainer">
                                <button className="editBtn" type="submit" onClick={(evt) => handleSubmit(evt)}>SAVE</button>
                                <button className="cancelBtn" onClick={() => setEditIsOpen(false)}>CANCEL</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}