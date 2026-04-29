import PropTypes from 'prop-types';

const TimerProgress = ({ tiempoRestante, tiempoMaximo }) => {

  const porcentaje = (tiempoRestante / tiempoMaximo) * 100;

  let color = 'bg-success';

  if (porcentaje < 50) color = 'bg-warning';
  if (porcentaje < 25) color = 'bg-danger';

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between">
        <span>Tiempo</span>
        <span>{tiempoRestante}s</span>
      </div>

      <div className="progress">
        <div
          className={`progress-bar ${color}`}
          role="progressbar"
          style={{ width: `${porcentaje}%` }}
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