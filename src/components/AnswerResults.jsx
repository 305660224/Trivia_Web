import PropTypes from 'prop-types';

export default function AnswerResults({ pregunta, estadisticas }) {
  const total = Object.values(estadisticas).reduce((a, b) => a + b, 0);

  return (
    <div className="card shadow answer-neon-card mt-4">
      <div className="card-header answer-neon-header text-white text-center">
        Resultado de la pregunta
      </div>

      <div className="card-body">
        <h5 className="text-center mb-4">
          Respuesta correcta: <span className="text-neon-success">{pregunta.correcta}</span>
        </h5>

        {pregunta.opciones.map((opcion, index) => {
          const cantidad = estadisticas[opcion] || 0;
          const porcentaje = total > 0 ? (cantidad / total) * 100 : 0;
          const esCorrecta = opcion === pregunta.correcta;

          return (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between">
                <strong>{opcion}</strong>
                <span>{cantidad} respuesta(s)</span>
              </div>

              <div className="progress answer-progress">
                <div
                  className={`progress-bar ${esCorrecta ? 'bg-success' : 'bg-secondary'}`}
                  style={{ width: `${porcentaje}%` }}
                >
                  {porcentaje.toFixed(0)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

AnswerResults.propTypes = {
  pregunta: PropTypes.object.isRequired,
  estadisticas: PropTypes.object.isRequired
};