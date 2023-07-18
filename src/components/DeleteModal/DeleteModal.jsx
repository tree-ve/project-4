import * as groupsAPI from '../../utilities/groups-api';
import { useNavigate } from 'react-router-dom';
import React from "react";

const DeleteModal = ({ group, setDeleteIsOpen }) => {
    const navigate = useNavigate();

    const handleDelete = async (evt, id) => {
        evt.preventDefault();
        console.log('handleDelete')
        try {
            console.log(id)
            await groupsAPI.deleteGroup(id);
            // setGroups(groups)
            setDeleteIsOpen(false)
            navigate('/groups');
        } catch (error) {
            console.log(error)
            this.setState({ error: "Couldn't Delete Group - Try Again" });
        }
  	}

    return(
        <>
            {console.log("DeleteModal")}
            <div className="darkBG" onClick={() => setDeleteIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Delete Group?</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setDeleteIsOpen(false)}>
                        X
                    </button>
                    <div className="ModalContent">
                        Are you sure you want to delete this group?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteBtn" onClick={(evt) => handleDelete(evt, group._id)}>DELETE</button>
                            {/* <button className="deleteBtn" onClick={() => setDeleteIsOpen(false)}>
                                DELETE
                            </button> */}
                            <button className="cancelBtn" onClick={() => setDeleteIsOpen(false)}>
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteModal