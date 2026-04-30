import PropTypes from 'prop-types'; 

const ScoreBoard = ({ puntuacion, aciertos, total, preguntaActual, porcentaje }) => {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-md-3">
        <div className="card text-center scoreboard-neon-card" key={puntuacion}>
          <div className="card-body py-3">
            <small>Puntuación</small>
            <h4 className="mb-0 score-number">{puntuacion}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card text-center scoreboard-neon-card">
          <div className="card-body py-3">
            <small>Aciertos</small>
            <h4 className="mb-0 score-number">{aciertos}/{total}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card text-center scoreboard-neon-card">
          <div className="card-body py-3">
            <small>Pregunta</small>
            <h4 className="mb-0 score-number">{preguntaActual}/{total}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card text-center scoreboard-neon-card">
          <div className="card-body py-3">
            <small>Efectividad</small>
            <h4 className="mb-0 score-number">{porcentaje}%</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

ScoreBoard.propTypes = {
  puntuacion: PropTypes.number.isRequired,
  aciertos: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  preguntaActual: PropTypes.number.isRequired,
  porcentaje: PropTypes.number.isRequired
};

export default ScoreBoard;