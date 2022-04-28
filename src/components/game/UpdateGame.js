import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentGame, getGameTypes, putGame } from "./GameManager";
import { useHistory } from "react-router-dom";

export const EditGame = () => {
    const [currentGame, setCurrentGame] = useState()
    const [gameTypes, setGameTypes] = useState([])
    const gameId = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getCurrentGame(gameId.gameId)
                .then(setCurrentGame)
        }, []
    )

    useEffect(
        () => {
            getGameTypes()
                .then(setGameTypes)
        }, []
    )

    const updateGame = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }

    const updateType = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name].id = event.target.value
        setCurrentGame(newGame)
    }


    return (
        currentGame ?
            <form className="gameForm">
                <h2 className="gameForm__title">Register New Game</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={currentGame.title}
                            onChange={updateGame}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="maker">Maker: </label>
                        <input type="text" name="maker" required autoFocus className="form-control"
                            value={currentGame.maker}
                            onChange={updateGame}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="num_of_players">Number of Players: </label>
                        <input type="number" name="number_of_players" required autoFocus className="form-control"
                            value={currentGame.number_of_players}
                            onChange={updateGame}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="skill_level">Skill Level: </label>
                        <input type="number" name="skill_level" required autoFocus className="form-control"
                            value={currentGame.skill_level}
                            onChange={updateGame}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <select className="form-control"
                        name="gametype"
                        value={currentGame.gametype.id}
                        placeholder="Select Game Type"
                        onChange={updateType}>
                        {
                            gameTypes?.map((type, index) => {
                                return <option key={index} name={type.label} value={type.id}>{type.label}</option>
                            })
                        }
                    </select>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const game = {
                            id: currentGame.id,
                            maker: currentGame.maker,
                            title: currentGame.title,
                            number_of_players: parseInt(currentGame.number_of_players),
                            skill_level: parseInt(currentGame.skill_level),
                            gametype: parseInt(currentGame.gametype.id)
                        }

                        // Send POST request to your API
                        putGame(game)
                            .then(() => history.push(`/games/${gameId.gameId}`))
                    }}
                    className="btn btn-4 icon-create">Submit</button>
            </form>
            : ""
    )
}

