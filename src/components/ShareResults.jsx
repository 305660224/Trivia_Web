import Button from "./Button";

export default function ShareResults ({puntos}) {

    const compartir = () => {
        alert(`Obtuve ${puntos} los puntos en el TriviaGame`)
    }
    return (

        <div className="mt-3">
      <Button
        texto="Compartir resultado"
        tipo="success"
        onClick={compartir}
      />
    </div>

    );
}