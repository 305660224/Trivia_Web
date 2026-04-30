import PropTypes from 'prop-types';
import Button from './Button';
import ShareResults from './ShareResults';

const GameOverModal = ({ show, puntuacion, aciertos, total, porcentaje, onReiniciar, onVolverInicio, user, config }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content gameover-neon">

          <div className="modal-header gameover-neon-header text-white">
            <h5 className="modal-title">🏆 Juego Terminado</h5>
          </div>

          <div className="modal-body text-center">
            <h2 className="display-4 text-neon-score">{puntuacion}</h2>
            <p className="mb-3">Puntuación Total</p>

            <div className="row mb-3">
              <div className="col-6">
                <div className="gameover-stat-box">
                  <h5>{aciertos}</h5>
                  <small>Aciertos</small>
                </div>
              </div>
              <div className="col-6">
                <div className="gameover-stat-box">
                  <h5>{total}</h5>
                  <small>Total</small>
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
              className="menu-neon-button"
              onClick={onReiniciar}
            />
            <Button
              texto="← Inicio"
              tipo="secondary"
              className="menu-logout-button"
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
  onVolverInicio: PropTypes.func,
  user: PropTypes.object,
  config: PropTypes.object
};

export default GameOverModal;