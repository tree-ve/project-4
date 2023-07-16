import * as eventsAPI from '../../utilities/events-api';
// import { useNavigate } from 'react-router-dom';
import React from "react";

const DeleteEventModal = ({ event, setEvents, setIsOpen }) => {
    // const navigate = useNavigate();

    const handleDelete = async (evt, id) => {
        evt.preventDefault();
        // console.log('handleDelete')
        try {
            // console.log('event._id ->', event._id)
            // console.log('id ->', id)
            await eventsAPI.deleteEvent(id);
            // setEvents(events)
            setIsOpen(false)
            const events = await eventsAPI.getEvents();
			// categoriesRef.current = [...new Set(events.map(event => event.owner._id))];
			setEvents(events)
            // navigate('/events');
        } catch (error) {
            console.log(error)
            this.setState({ error: "Couldn't Delete Event - Try Again" });
        }
  	}

    return(
        <>
            {/* {console.log("DeleteEventModal")} */}
            {/* {console.log('event ->', event)} */}
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Delete Event?</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                        X
                    </button>
                    <div className="ModalContent">
                        Are you sure you want to delete this event?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteBtn" onClick={(evt) => handleDelete(evt, event._id)}>DELETE</button>
                            {/* <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                                DELETE
                            </button> */}
                            <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteEventModal