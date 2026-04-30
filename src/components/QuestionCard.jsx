import PropTypes from "prop-types";
import Button from "./Button";
import './QuestionCard.css';

export default function QuestionCard({
  pregunta,
  opciones,
  onRespuesta,
  dificultad,
  numero,
  total,
  deshabilitado
}) {
  return (
  <div className="trivia-neon-container">

    <div className="question-neon-box">
      <p className="mb-2">
        Pregunta {numero} de {total} | Dificultad: {dificultad}
      </p>
      <h3>{pregunta}</h3>
    </div>

    <div className="row">
      {opciones.map((opcion, index) => (
        <div className="col-md-6 mb-4" key={index}>
          <button
            className="answer-neon-btn"
            onClick={() => onRespuesta(opcion)}
            disabled={deshabilitado}
          >
            <span className="answer-letter">
              {["A", "B", "C", "D"][index]}
            </span>
            {opcion}
          </button>
        </div>
      ))}
    </div>

  </div>
);
}

QuestionCard.propTypes = {
  pregunta: PropTypes.string.isRequired,
  opciones: PropTypes.array.isRequired,
  onRespuesta: PropTypes.func.isRequired,
  dificultad: PropTypes.string,
  numero: PropTypes.number,
  total: PropTypes.number,
  deshabilitado: PropTypes.bool
};

