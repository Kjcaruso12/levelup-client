import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EditEvent } from "./event/UpdateEvent"
import { GameDetails } from "./game/GameDetails"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { EditGame } from "./game/UpdateGame"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route path="/games/new">
                <GameForm />
            </Route>
            <Route path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route path="/games/edit/:gameId(\d+)">
                <EditGame />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route path="/events/:eventId(\d+)">

            </Route>
            <Route path="/events/edit/:eventId(\d+)">
                <EditEvent />
            </Route>
        </main>
    </>
}
