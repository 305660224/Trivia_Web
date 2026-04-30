import PropTypes from "prop-types";
import Button from "./Button";

export default function ShareResults({ puntos = 0, total = 0, user = null, config = {} }) {

    
    const generarUrlReto = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams({
            cat: config.categoria || '',
            diff: config.dificultad || '',
            qty: config.cantidad || 10,
            retador: user?.displayName || 'Anónimo',
            pts: puntos
        }).toString();
        return `${baseUrl}?${params}`;
    };

    
    const generarMensaje = () => {
        const nombre = user?.displayName || 'Alguien';
        return `🔥 ¡${nombre} te ha retado en Trivia Game!\n\n` +
               `📊 Mi puntaje: ${puntos} puntos de ${total}\n` +
               `⚡ Dificultad: ${config.dificultad || 'variada'}\n\n` +
               `¿Puedes superarme? 🏆\n`;
    };

    const compartirGoogle = () => {
        const asunto = `¡${user?.displayName || 'Alguien'} te reta en Trivia Game!`;
        const mensaje = generarMensaje() + generarUrlReto();
        const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

    const compartirFacebook = () => {
        const urlFinal = generarUrlReto();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlFinal)}&quote=${encodeURIComponent(generarMensaje())}`;
        window.open(url, "_blank");
    };

    const compartirWhatsApp = () => {
        const mensaje = generarMensaje() + generarUrlReto();
        const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

    const copiarEnlace = () => {
        const texto = generarMensaje() + generarUrlReto();
        navigator.clipboard.writeText(texto);
        alert("✅ ¡Reto copiado al portapapeles! Envíalo a tus amigos.");
    };

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

            <Button
                texto="Copiar enlace"
                tipo="secondary"
                onClick={copiarEnlace}
            />

        </div>
    );
}

ShareResults.propTypes = {
    puntos: PropTypes.number,
    total: PropTypes.number,
    user: PropTypes.object,
    config: PropTypes.object
};