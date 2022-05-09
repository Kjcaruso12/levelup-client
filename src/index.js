import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { LevelUp } from "./components/LevelUp.js"
import "./index.css"

ReactDOM.render(
        <Router>
            <LevelUp />
        </Router>,
    document.getElementById("root")
)
