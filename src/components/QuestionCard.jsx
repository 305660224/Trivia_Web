import PropTypes from "prop-types";
import Button from "./Button";

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
    <div className="text-center">

      <p className="text-muted">
        Pregunta {numero} de {total} | Dificultad: {dificultad}
      </p>

      <h4 className="mb-4">{pregunta}</h4>

      <div className="row">
        {opciones.map((opcion, index) => (
          <div className="col-6 mb-3" key={index}>
            <Button
              texto={opcion}
              tipo={["danger", "primary", "success", "warning"][index]}
              onClick={() => onRespuesta(opcion)}
              disabled={deshabilitado} 
            />
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

