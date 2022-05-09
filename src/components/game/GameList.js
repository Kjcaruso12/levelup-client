import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const handleDelete = (gameId) => {
        const filteredEvent = games.filter(game => game.id != gameId)
        setGames(filteredEvent)
        deleteGame(gameId)
    }

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games?.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/games/${game.id}`}>
                            <div className="game__title">{game.title} by {game.maker}</div>
                        </Link>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="delete-button"
                            onClick={() => {
                                handleDelete(game.id)
                            }}
                        >
                            Delete
                        </button>
                    </section>
                })
            }
        </article>
    )
}