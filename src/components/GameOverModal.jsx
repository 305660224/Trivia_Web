import PropTypes from 'prop-types';
import Button from './Button';
import ShareResults from './ShareResults';

const GameOverModal = ({ show, puntuacion, aciertos, total, porcentaje, onReiniciar }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Juego Terminado</h5>
          </div>
          
          <div className="modal-body text-center">
            <div className="mb-3">
              <h2 className="display-4 text-primary">{puntuacion}</h2>
              <p className="text-muted">Puntuación Total</p>
            </div>
            
            <div className="row mb-3">
              <div className="col-6">
                <div className="border rounded p-2">
                  <h5>{aciertos}</h5>
                  <small className="text-muted">Aciertos</small>
                </div>
              </div>
              <div className="col-6">
                <div className="border rounded p-2">
                  <h5>{total}</h5>
                  <small className="text-muted">Total</small>
                </div>
              </div>
            </div>
            
            <div className="progress mb-3" style={{ height: '20px' }}>
              <div 
                className="progress-bar bg-success"
                style={{ width: `${porcentaje}%` }}
              >
                {porcentaje}% Aciertos
              </div>
            </div>
            
            <ShareResults puntos={puntuacion} />
          </div>
          
          <div className="modal-footer justify-content-center">
            <Button
              texto="Nueva Partida"
              tipo="primary"
              onClick={onReiniciar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

GameOverModal.propTypes = {
  show: PropTypes.bool.isRequired,
  puntuacion: PropTypes.number.isRequired,
  aciertos: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  porcentaje: PropTypes.number.isRequired,
  onReiniciar: PropTypes.func.isRequired
};

export default GameOverModal;