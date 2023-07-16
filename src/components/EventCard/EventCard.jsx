// import { Link } from "react-router-dom"
import { useState } from "react";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";


export default function EventCard({ event, setEvents }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* {console.log('EventCard events -> ', event)} */}
            {/* {events.map(e => ( */}
                <div className="event-card" key={event._id}>
                    <button className="deleteEventBtn" onClick={() => setIsOpen(true)}>X</button>
                    {isOpen && <DeleteEventModal event={event} setEvents={setEvents} setIsOpen={setIsOpen} />}
                    <h2 className="event-card-text">{event.name}</h2>
                    <div className="event-card-times">
                        <p className="event-card-start">From: {event.start}</p>
                        <p className="event-card-end">To: {event.end}</p>
                    </div>
                    
                </div>
            {/* ))} */}
        </>
    )
}