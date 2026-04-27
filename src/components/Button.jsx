export default function Button({ texto, onClick, tipo = "primary", className = "", disable = false }) {

    return (
        <button
            className={`btn btn-${tipo} me-2 ${className}`}
            onClick={onClick}
            disabled={disable}
        >
            {texto}
            
        </button>
    );
}