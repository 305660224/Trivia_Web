import PropTypes from 'prop-types';
import './Question.css';


const Question = ({ question, difficulty, number, total }) => {

  const getDifficultyColor = (level) => {
    if (!level) return 'secondary';
    const normalized = level.toLowerCase();
    if (normalized === 'easy' || normalized === 'fácil') return 'success';
    if (normalized === 'medium' || normalized === 'medio') return 'warning';
    if (normalized === 'hard' || normalized === 'difícil') return 'danger';
    return 'secondary';
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-counter">
          Pregunta {number} de {total}
        </span>
        {difficulty && (
          <span className={`badge bg-${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        )}
      </div>
      <div className="question-body">
        <h2 className="question-text">{question}</h2>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  number: PropTypes.number,
  total: PropTypes.number,
};

export default Question;