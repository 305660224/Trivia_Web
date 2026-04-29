import PropTypes from "prop-types";
import Button from "./Button";
import ShareResults from "./ShareResults";

export default function ResultScreen({score, onReiniciar}) {
    return(
        <div className="text-center">

            <h2 className="mb-4">Juego Terminado</h2>

            <h3 className="mb-4">Puntaje: {score}</h3>

            <div className="m-3">
                <ShareResults puntos={score} />
            </div>

            <Button
            texto= "Juagra Otra Vez"
            tipo= "primary"
            onClick={onReiniciar}
            />

        </div>
    );
}

ResultScreen.PropTypes = {
    score: PropTypes.number,
    onReiniciar: PropTypes.func
}