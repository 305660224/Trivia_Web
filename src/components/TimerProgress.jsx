import PropTypes from 'prop-types';

const TimerProgress = ({ tiempoRestante, tiempoMaximo }) => {
  const porcentaje = (tiempoRestante / tiempoMaximo) * 100;
  
  const getColor = () => {
    if (porcentaje > 60) return 'bg-success';
    if (porcentaje > 30) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-1">
        <small>Tiempo restante</small>
        <small className={`fw-bold ${tiempoRestante <= 5 ? 'text-danger' : ''}`}>
          {tiempoRestante} segundos
        </small>
      </div>
      <div className="progress" style={{ height: '10px' }}>
        <div 
          className={`progress-bar ${getColor()} progress-bar-striped progress-bar-animated`}
          style={{ width: `${porcentaje}%` }}
          role="progressbar"
        />
      </div>
    </div>
  );
};

TimerProgress.propTypes = {
  tiempoRestante: PropTypes.number.isRequired,
  tiempoMaximo: PropTypes.number.isRequired
};

export default TimerProgress;