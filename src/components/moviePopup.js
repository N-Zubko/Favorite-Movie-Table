import React from "react";
import '../index.css'
import { Card } from "primereact/card";


function MoviePopup(props) {
    return (props.trigger) ? (
        <Card className="movie-card" >
            <button onClick={ () => props.setTrigger(false)}> X </button>
            
            <div className="movie-card-content">
                <p id="movieTitle">title</p>
                <p>Directed by <span id="movieDirector">director</span></p>
                <p>Cast: <span id="movieCast"></span>cast</p>
                <p>Genre: <span id="movieGenre"></span>genre</p>
                <p>Plot:</p>
                <p id="moviePlot">plot</p>
                </div>
                <p>All movie data are from Wikipedia and IMDb</p>
        </Card>
    ) : ""
}

export default MoviePopup;