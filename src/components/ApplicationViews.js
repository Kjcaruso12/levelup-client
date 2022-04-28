import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EditEvent } from "./event/UpdateEvent"
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
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/gameId(\d+)">

            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <EditGame />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/:eventId(\d+)">

            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <EditEvent />
            </Route>
        </main>
    </>
}
