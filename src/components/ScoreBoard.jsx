import PropTypes from 'prop-types'; 

const ScoreBoard = ({ puntuacion, aciertos, total, preguntaActual, porcentaje }) => {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-md-3">
        <div className="card bg-primary text-white text-center">
          <div className="card-body py-2">
            <small>Puntuación</small>
            <h4 className="mb-0">{puntuacion}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card bg-success text-white text-center">
          <div className="card-body py-2">
            <small>Aciertos</small>
            <h4 className="mb-0">{aciertos}/{total}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card bg-info text-white text-center">
          <div className="card-body py-2">
            <small>Pregunta</small>
            <h4 className="mb-0">{preguntaActual}/{total}</h4>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card bg-warning text-white text-center">
          <div className="card-body py-2">
            <small>Efectividad</small>
            <h4 className="mb-0">{porcentaje}%</h4>
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