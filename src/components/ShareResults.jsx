import PropTypes from "prop-types";
import Button from "./Button";

export default function ShareResults({ puntos = 0 }) {

    const compartirGoogle = () => {
        const asunto = "Resultado TriviaGame";
        const mensaje = `Obtuve ${puntos} puntos en la TriviaGame que hice`;
        const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
    }

    const compartirFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=https://mi-trivia.com&quote=Obtuve ${puntos} puntos en TriviaGame`
        window.open(url, "_blank")
    }

    return (

        <div className="d-flex justify-content-center gap-2 flex-wrap">

            <Button
                texto="Compartir en Google"
                tipo="danger"
                onClick={compartirGoogle}
            />

            <Button
                texto="Compartir en Facebook"
                tipo="primary"
                onClick={compartirFacebook}
            />
        </div>



    );
}

ShareResults.propTypes = {
    puntos: PropTypes.number
};