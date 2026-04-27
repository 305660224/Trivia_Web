import Button from "./Button";

export default function LoginButtons() {
    return (
        <div className="mt-3">

            <Button
                texto="Iniciar con Google"
                tipo="danger"
                onClick={() => alert("Google")}
            />

            <Button
                texto="Iniciar con Facebook"
                tipo="primary"
                onClick={() => alert("Facebook")}
            />

        </div>
    );
}