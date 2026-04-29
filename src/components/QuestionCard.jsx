import PropTypes from 'prop-types';

const QuestionCard = ({ pregunta, dificultad, numero, total }) => {
  const getDifficultyColor = (level) => {
    if (!level) return 'secondary';
    const normalized = level.toLowerCase();
    if (normalized === 'easy') return 'success';
    if (normalized === 'medium') return 'warning';
    if (normalized === 'hard') return 'danger';
    return 'secondary';
  };

  const getDifficultyText = (level) => {
    if (!level) return 'Normal';
    const normalized = level.toLowerCase();
    if (normalized === 'easy') return 'Fácil';
    if (normalized === 'medium') return 'Media';
    if (normalized === 'hard') return 'Difícil';
    return level;
  };

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <span>Pregunta {numero} de {total}</span>
          <span className={`badge bg-${getDifficultyColor(dificultad)}`}>
            {getDifficultyText(dificultad)}
          </span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title text-center mb-0">{pregunta}</h3>
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  pregunta: PropTypes.string.isRequired,
  dificultad: PropTypes.string,
  numero: PropTypes.number,
  total: PropTypes.number
};

export default QuestionCard;