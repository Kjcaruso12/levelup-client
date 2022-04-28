import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGameTypes, createGame } from "../game/GameManager"


export const GameForm = ({currentGame, updateGame}) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    const [newGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        gameTypeId: 1
    })

    useEffect(
        () => {
            getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newForm = Object.assign({}, newGame)
        newForm[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newForm)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={newGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={newGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={newGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={newGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <select className="form-control"
                name="gameTypeId"
                value={newGame.gameTypeId}
                placeholder="Select Game Type"
                onChange={changeGameState}>
                    {
                        gameTypes?.map((type, index) => {
                            return <option key={index} name="gameTypeId" value={type.id}>{type.label}</option>
                        })
                    }
                </select>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: newGame.maker,
                        title: newGame.title,
                        number_of_players: parseInt(newGame.number_of_players),
                        skill_level: parseInt(newGame.skill_level),
                        gametype: parseInt(newGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-4 icon-create">Create</button>
        </form>
    )
}