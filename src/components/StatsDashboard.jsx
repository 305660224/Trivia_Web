import PropTypes from 'prop-types';

const StatsDashboard = ({ 
  totalGames = 0,
  totalQuestions = 0,
  totalCorrect = 0,
  totalScore = 0,
  averagePercentage = 0,
  bestStreak = 0
}) => {
  return (
    <div className="stats-dashboard">
      <h2 className="mb-4">Mis Estadísticas</h2>
      
      <div className="row g-3">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Partidas Jugadas</h5>
              <p className="display-5 fw-bold text-primary">{totalGames}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Preguntas Totales</h5>
              <p className="display-5 fw-bold text-info">{totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Respuestas Correctas</h5>
              <p className="display-5 fw-bold text-success">{totalCorrect}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Porcentaje General</h5>
              <p className="display-5 fw-bold text-warning">{averagePercentage}%</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Puntuación Total</h5>
              <p className="display-5 fw-bold text-danger">{totalScore}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Mejor Racha</h5>
              <p className="display-5 fw-bold text-secondary">{bestStreak}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatsDashboard.propTypes = {
  totalGames: PropTypes.number,
  totalQuestions: PropTypes.number,
  totalCorrect: PropTypes.number,
  totalScore: PropTypes.number,
  averagePercentage: PropTypes.number,
  bestStreak: PropTypes.number,
};

export default StatsDashboard;