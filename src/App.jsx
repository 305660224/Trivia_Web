import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import TriviaGame from './components/TriviaGame';
import LoginButtons from './components/LoginButtons';

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [cantidad, setCantidad] = useState(10);

  const configuracionJuego = {
    cantidad: cantidad,
    categoria: categoria || null,
    dificultad: dificultad || null
  };

  const handleGameComplete = (resultados) => {
    console.log('Juego completado:', resultados);
  };

  return (
    <Layout>
      <NavigationBar />
      
      <div className="container mt-5">
        {!juegoIniciado ? (
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              {/* ENCABEZADO PAGINA */}
              <div className="text-center mb-5">
                <h1 className="display-3 fw-bold text-primary mb-3">Trivia Game Project</h1>
                <p className="lead text-muted">
                  Proyecto Tecnologias y Sistemas Web I :P
                </p>
              </div>

              {/* CARD DE CONFIGURACION DE PARTIDA*/}
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-gradient bg-primary text-white rounded-top-4 py-3">
                  <h3 className="mb-0 text-center">
                    <i className="bi bi-gear-fill me-2"></i>
                    Configuracion de la Partida:
                  </h3>
                </div>
                
                <div className="card-body p-4">
                  {/* SELECCION DE CATEGORIa */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2">
                      <i className="bi bi-tag-fill me-2 text-primary"></i>
                      ₍^. .^₎⟆ Categoría seleccionada:
                    </label>
                    <select 
                      className="form-select form-select-lg border-2"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">🎲 Todas las categorías</option>
                      <option value="arts_and_literature">📚 Arte y Literatura</option>
                      <option value="film_and_tv">🎬 Cine y TV</option>
                      <option value="general_knowledge">💡 Cultura General</option>
                      <option value="geography">🌍 Geografía</option>
                      <option value="history">📜 Historia</option>
                      <option value="music">🎵 Música</option>
                      <option value="science">🔬 Ciencia</option>
                      <option value="sports">⚽ Deportes</option>
                      <option value="technology">💻 Tecnología</option>
                    </select>
                  </div>

                  {/* Selector de dificultad */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2">
                      <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                      Dificultad
                    </label>
                    <div className="d-flex gap-3">
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dificultad"
                          id="todas"
                          value=""
                          checked={dificultad === ''}
                          onChange={(e) => setDificultad(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="todas">
                          🎲 Todas
                        </label>
                      </div>
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dificultad"
                          id="facil"
                          value="easy"
                          checked={dificultad === 'easy'}
                          onChange={(e) => setDificultad(e.target.value)}
                        />
                        <label className="form-check-label text-success" htmlFor="facil">
                          Fácil
                        </label>
                      </div>
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dificultad"
                          id="medio"
                          value="medium"
                          checked={dificultad === 'medium'}
                          onChange={(e) => setDificultad(e.target.value)}
                        />
                        <label className="form-check-label text-warning" htmlFor="medio">
                          Media
                        </label>
                      </div>
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dificultad"
                          id="dificil"
                          value="hard"
                          checked={dificultad === 'hard'}
                          onChange={(e) => setDificultad(e.target.value)}
                        />
                        <label className="form-check-label text-danger" htmlFor="dificil">
                          Difícil
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Selector de cantidad */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2">
                      <i className="bi bi-question-circle-fill me-2 text-primary"></i>
                      Cantidad de preguntas: <span className="badge bg-primary">{cantidad}</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min="5"
                      max="20"
                      step="5"
                      value={cantidad}
                      onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between text-muted small">
                      <span>5</span>
                      <span>10</span>
                      <span>15</span>
                      <span>20</span>
                    </div>
                  </div>

                  {/* Botón de iniciar */}
                  <button 
                    className="btn btn-primary btn-lg w-100 py-3 fw-bold fs-4 mt-3"
                    onClick={() => setJuegoIniciado(true)}
                  >
                    Comenzar Partida
                  </button>

                  {/* Separador */}
                  <div className="position-relative my-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      o inicia sesión
                    </span>
                  </div>

                  {/* Login buttons mejorados */}
                  <LoginButtons />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <TriviaGame 
              configuracion={configuracionJuego}
              onGameComplete={handleGameComplete}
            />
            <div className="text-center mt-4">
              <button 
                className="btn btn-outline-secondary btn-lg px-5"
                onClick={() => setJuegoIniciado(false)}
              >
                ← Volver al inicio
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;