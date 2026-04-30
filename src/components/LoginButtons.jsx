import Button from "./Button";
import { loginWithGoogle, loginWithGithub } from '../services/authService';

export default function LoginButtons({ onLoginSuccess }) {

    const handleGoogle = async () => {
        try {
            const user = await loginWithGoogle();
            if (onLoginSuccess) onLoginSuccess(user);
        } catch (error) {
            console.error("Error Google:", error);
        }
    };

    const handleGithub = async () => {
        try {
            const user = await loginWithGithub();
            if (onLoginSuccess) onLoginSuccess(user);
        } catch (error) {
            console.error("Error GitHub:", error);
        }
    };

    return (
        <div className="mt-3">

            <Button
                texto="Iniciar con Google"
                tipo="danger"
                onClick={handleGoogle}
            />

            <Button
                texto="Iniciar con GitHub"
                tipo="dark"
                onClick={handleGithub}
            />

        </div>
    );
}