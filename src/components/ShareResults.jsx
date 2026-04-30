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
    
    const compartirWhatsApp = () => {
        const mensaje = `Obtuve ${puntos} puntos en TriviaGame ¡Juega tú también!`;
        const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    }

    return (

        <div className="d-flex justify-content-center gap-2 flex-wrap">

            <Button
                texto={
                <span>
                    <img 
                        src={"./src/imagenes/google.png"} 
                    alt="Google" 
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    />
                    Compartir en Google
                </span>
                }
                tipo="danger"
                onClick={compartirGoogle}
            />

            <Button
                texto={
                <span>
                <img 
                src={"./src/imagenes/facebook.png"} 
                alt="Facebook" 
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                Compartir en Facebook
                </span>
                }
                tipo="primary"
                onClick={compartirFacebook}
            />

            <Button
                texto={
                    <span>
                        <img 
                            src={"./src/imagenes/whatsapp.png"} 
                            alt="WhatsApp" 
                            style={{ width: '20px', height: '20px', marginRight: '8px' }}
                        />
                        Compartir en WhatsApp
                    </span>
                }
                tipo="success"
                onClick={compartirWhatsApp}
            />
        </div>



    );
}

ShareResults.propTypes = {
    puntos: PropTypes.number
};