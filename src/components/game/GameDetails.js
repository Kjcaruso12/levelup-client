import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { getCurrentGame } from "./GameManager"

export const GameDetails = () => {
    const [currentGame, setCurrentGame] = useState()
    const { gameId } = useParams()
    // get specific game from API

    useEffect(
        () => {
            getCurrentGame(gameId)
                .then(data => setCurrentGame(data))
        }, [gameId]
    )

    return (
        currentGame ?
            <>
                <div className="game_details">
                    <div className="game__title">{currentGame.title} created by {currentGame.maker}</div>
                    <div className="game__description">Submitted by {currentGame.gamer.user.username}</div>
                    <div className="game__players">{currentGame.number_of_players} players needed</div>
                    <div className="game__time_estimate">Estimated skill level of {currentGame.skill_level}</div>
                    <div className="game__age">Game Type: {currentGame.gametype.label}</div>
                </div>
            </>
            : ""
    )
}