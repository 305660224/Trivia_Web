import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({ current = 0, total = 10 }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress">
        <div 
          className="progress-bar bg-primary" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="progress-text">{current} de {total} preguntas</p>
    </div>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
};

export default ProgressBar;