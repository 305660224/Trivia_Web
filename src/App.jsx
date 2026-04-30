import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import TriviaGame from './components/TriviaGame';
import LoginButtons from './components/LoginButtons';
import { onUserChange, logout } from './services/authService';

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [cantidad, setCantidad] = useState(10);
  const [traduccionActivada, setTraduccionActivada] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [mensajeReto, setMensajeReto] = useState(null); // banner del reto recibido

  // Leer parámetros de URL al cargar (cuando alguien abre un reto compartido)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const diff = params.get('diff');
    const qty = params.get('qty');
    const retador = params.get('retador');
    const pts = params.get('pts');

    if (retador) {
      if (cat) setCategoria(cat);
      if (diff) setDificultad(diff);
      if (qty) setCantidad(Number(qty));
      setMensajeReto({ retador, pts });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onUserChange((currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setJuegoIniciado(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const configuracionJuego = {
    cantidad: cantidad,
    categoria: categoria || null,
    dificultad: dificultad || null
  };

  const handleGameComplete = (resultados) => {
    console.log('Juego completado:', resultados);
  };

  if (loadingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <NavigationBar />
      
      <div className="container mt-5">
        {!juegoIniciado ? (
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">

              {/* BANNER DE RETO - solo aparece si abriste un link de reto */}
              {mensajeReto && (
                <div className="alert alert-warning text-center fw-bold mb-4 rounded-4 shadow-sm">
                  🔥 <strong>{mensajeReto.retador}</strong> te ha retado con <strong>{mensajeReto.pts} puntos</strong>. ¡La partida ya está configurada, superalo!
                </div>
              )}

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

                  {/*SWITCH(no de redes xd) TRADUCCIÓN */}
                  <div className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="bi bi-translate me-2 text-primary fs-4"></i>
                        <strong className="fs-5">Traducción de Ingles - Español</strong>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input fs-3"
                          type="checkbox"
                          id="traduccionSwitch"
                          checked={traduccionActivada}
                          onChange={(e) => setTraduccionActivada(e.target.checked)}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label fw-bold ms-2" htmlFor="traduccionSwitch">
                        </label>
                      </div>
                    </div>
                  </div>
                
                <div className="card-body p-4">
                  {/* SELECCION DE CATEGORIA */}
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
                      {user ? `Sesión iniciada como ${user.displayName}` : 'o inicia sesión'}
                    </span>
                  </div>

                  {/* Login buttons / logout */}
                  {user ? (
                    <div className="mt-3 text-center">
                      <button className="btn btn-outline-secondary" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </div>
                  ) : (
                    <LoginButtons onLoginSuccess={setUser} />
                  )}

                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <TriviaGame 
              configuracion={configuracionJuego}
              onGameComplete={handleGameComplete}
              traduccionActivada={traduccionActivada}
              user={user}
              onVolverInicio={() => setJuegoIniciado(false)}
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