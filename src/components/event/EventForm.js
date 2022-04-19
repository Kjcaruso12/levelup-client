import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from './EventManager'
import { getGames } from "../game/GameManager"


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0,
    })

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
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.maker}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.numberOfPlayers}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <select className="form-control"
                    name="gameId"
                    value={currentEvent.gameId}
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
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-4 icon-create">Create</button>
        </form>
    )
}