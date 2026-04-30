import PropTypes from 'prop-types';
import Button from './Button';
import ShareResults from './ShareResults';

const GameOverModal = ({ show, puntuacion, aciertos, total, porcentaje, onReiniciar, onVolverInicio, user, config }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Juego Terminado</h5>
          </div>

          <div className="modal-body text-center">
            <h2 className="display-4 text-primary">{puntuacion}</h2>
            <p className="text-muted mb-3">Puntuación Total</p>

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
              <div className="progress-bar bg-success" style={{ width: `${porcentaje}%` }}>
                {porcentaje}% Aciertos
              </div>
            </div>

            <ShareResults puntos={puntuacion} total={total} user={user} config={config} />
          </div>

          <div className="modal-footer justify-content-center gap-2">
            <Button
              texto="Nueva Partida"
              tipo="primary"
              onClick={onReiniciar}
            />
            <Button
              texto="← Inicio"
              tipo="outline-secondary"
              onClick={onVolverInicio}
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
  onReiniciar: PropTypes.func.isRequired,
  onVolverInicio: PropTypes.func.isRequired,
  user: PropTypes.object,
  config: PropTypes.object
};

export default GameOverModal;