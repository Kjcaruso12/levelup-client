import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "./EventManager.js"
import "./Event.css"

export const EventList = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const [attending, setAttending] = useState(false)

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [attending])

    const handleDelete = (eventId) => {
        const filteredEvent = events.filter(event => event.id != eventId)
        setEvents(filteredEvent)
        deleteEvent(eventId)
    }

    const attendingSwitch = () => {
        let currentValue = attending
        currentValue = !currentValue
        setAttending(currentValue)
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Schedule New Event</button>
            {
                events?.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.game.title} hosted by {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                        <div className="event_description">{event.description}</div>
                        <div className="event__date">{event.date} at {event.time}</div>
                        <button className="delete-button"
                            onClick={() => {
                                handleDelete(event.id)
                            }}
                        >
                            Delete
                        </button>
                        {
                            event.joined ?
                                // TODO: create the Leave button
                                <button className="leave_button"
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(attendingSwitch)
                                    }}
                                >
                                    Leave
                                </button>
                                :
                            // TODO: create the Join button
                                <button className="join_button"
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(attendingSwitch)
                                    }}
                                >
                                    Join
                                </button>
                        }

                    </section>
                })
            }
        </article>
    )
}