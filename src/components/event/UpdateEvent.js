import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { putEvent, getCurrentEvent } from './EventManager'
import { getGames } from "../game/GameManager"
import { useParams } from "react-router-dom"


export const EditEvent = () => {
    const history = useHistory()
    const eventId = useParams()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState()


    useEffect(
        () => {
            getCurrentEvent(eventId.eventId)
            .then(setCurrentEvent)
        }, []
        )

    useEffect(
        () => {
            getGames()
                .then(data => setGames(data))
        }, [])

    const changeEventState = (domEvent) => {
        const newForm = Object.assign({}, currentEvent)
        newForm[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newForm)
    }

    return (
        currentEvent?
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <select className="form-control"
                    name="gameId"
                    value={currentEvent.game.id}
                    placeholder="Select a Game"
                    onChange={changeEventState}
                >
                    {
                        games.map((game, index) => {
                            return <option key={index} name="gameId" value={game.id}>{game.title}</option>
                        })
                    }
                </select>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: currentEvent.id,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game.id)
                    }

                    // Send POST request to your API
                    putEvent(event)
                        .then(() => history.push(`/events/${eventId.eventId}`))
                }}
                className="btn btn-4 icon-create">Create</button>
        </form>
        :""
    )
}