import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import TimerProgress from './TimerProgress';
import ScoreBoard from './ScoreBoard';
import GameOverModal from './GameOverModal';
import LoadingSpinner from './LoadingSpinner';
import { TriviaApi } from './TriviaApi';
import AnswerResults from './AnswerResults';
import Button from './Button';

const TriviaGame = ({ configuracion, onGameComplete, traduccionActivada = false, user }) => { 

  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(false);
  const [estadisticas, setEstadisticas] = useState({})
  const [puntosGanados, setPuntosGanados] = useState(0);

  const tiempoAgotadoRef = useRef(false);
  const tiempoRef = useRef(0); // tiempo real sincronizado

  //  tiempo por dificultad
  const getTiempoPorDificultad = (dificultad) => {
    switch (dificultad?.toLowerCase()) {
      case 'easy': return 30;
      case 'medium': return 20;
      case 'hard': return 10;
      default: return 25;
    }
  };

  // puntos tipo Kahoot (por rangos)
  const calcularPuntos = (tiempoRestante, tiempoMaximo) => {
    const porcentaje = tiempoRestante / tiempoMaximo;

    if (porcentaje >= 0.75) return 200;
    if (porcentaje >= 0.5) return 150;
    if (porcentaje >= 0.25) return 120;
    return 100;
  };

  // cargar preguntas (MODIFICADO para recibir traduccionActivada)
  useEffect(() => {
    const cargarPreguntas = async () => {
      setCargando(true);
      try {
        const data = await TriviaApi(configuracion, traduccionActivada); // 👈 AGREGADO segundo parámetro
        setPreguntas(data);
        setIndiceActual(0);
        setPuntuacion(0);
        setAciertos(0);
        setJuegoTerminado(false);
        setRespuestaSeleccionada(false);
      } catch (error) {
        console.error('Error cargando preguntas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPreguntas();
  }, [configuracion, traduccionActivada]); 

  //  configurar pregunta
  useEffect(() => {
    if (preguntas.length > 0 && indiceActual < preguntas.length) {
      const pregunta = preguntas[indiceActual];

      const tiempoInicial = getTiempoPorDificultad(pregunta.dificultad);

      setPreguntaActual(pregunta);
      setTiempoRestante(tiempoInicial);
      tiempoRef.current = tiempoInicial; // sincroniza tiempo real

      setRespuestaSeleccionada(false);
     
      tiempoAgotadoRef.current = false;

      const conteo = {}
      pregunta.opciones.forEach(op => {
        conteo[op] = 0
      });
      setEstadisticas(conteo)
    }
  }, [indiceActual, preguntas]);

  // siguiente pregunta
  const siguientePregunta = useCallback(() => {
    setIndiceActual((prev) => {
      const siguiente = prev + 1;

      if (siguiente >= preguntas.length) {
        setJuegoTerminado(true);

        if (onGameComplete) {
          onGameComplete({
            puntuacion,
            aciertos,
            total: preguntas.length,
            porcentaje: Math.round((aciertos / preguntas.length) * 100)
          });
        }

        return prev;
      }

      return siguiente;
    });
  }, [preguntas.length, onGameComplete, puntuacion, aciertos]);

  //  tiempo agotado
  const manejarTiempoAgotado = useCallback(() => {
    if (respuestaSeleccionada || tiempoAgotadoRef.current) return;

    tiempoAgotadoRef.current = true;

    setRespuestaSeleccionada(true);
    
  }, [respuestaSeleccionada, siguientePregunta]);

  // timmer
  useEffect(() => {
    if (cargando || juegoTerminado || respuestaSeleccionada || !preguntaActual) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        const nuevoTiempo = prev - 1;

        tiempoRef.current = nuevoTiempo; // sincronización real

        if (prev <= 1) {
          clearInterval(timer);
          manejarTiempoAgotado();
          return 0;
        }

        return nuevoTiempo;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cargando, juegoTerminado, respuestaSeleccionada, preguntaActual, manejarTiempoAgotado]);

  //  responder
  const manejarRespuesta = useCallback((respuesta) => {
    if (respuestaSeleccionada) return;

    setRespuestaSeleccionada(true);
    setPuntosGanados(0)

    setEstadisticas(prev => ({
  ...prev,
  [respuesta]: (prev[respuesta] || 0) + 1
}));

    const esCorrecta = respuesta === preguntaActual?.correcta;

    if (esCorrecta) {
      const tiempoMaximo = getTiempoPorDificultad(preguntaActual.dificultad);
      const puntosGanados = calcularPuntos(tiempoRef.current, tiempoMaximo);

      setPuntosGanados(puntosGanados);
      setPuntuacion(prev => prev + puntosGanados);
      setAciertos(prev => prev + 1);
    }

  }, [preguntaActual, respuestaSeleccionada, siguientePregunta]);

  // reiniciar (MODIFICADO para mantener traducción al reiniciar)
  const reiniciarJuego = () => {
    setJuegoTerminado(false);
    setIndiceActual(0);
    setPuntuacion(0);
    setAciertos(0);
    setRespuestaSeleccionada(false);
    setCargando(true);

    const recargar = async () => {
      try {
        const data = await TriviaApi(configuracion, traduccionActivada);
        setPreguntas(data);
      } finally {
        setCargando(false);
      }
    };

    recargar();
  };

  if (cargando) return <LoadingSpinner />;
  if (!preguntaActual) return <div className="text-center mt-4">Error cargando la pregunta</div>;

  const porcentajeActual = preguntas.length > 0
    ? Math.round((aciertos / (indiceActual + (respuestaSeleccionada ? 1 : 0))) * 100)
    : 0;

  return (
    <div className="container py-4">

      <ScoreBoard
        puntuacion={puntuacion}
        aciertos={aciertos}
        total={preguntas.length}
        preguntaActual={indiceActual + 1}
        porcentaje={porcentajeActual}
      />

      <TimerProgress
        tiempoRestante={tiempoRestante}
        tiempoMaximo={getTiempoPorDificultad(preguntaActual.dificultad)}
      />

      <QuestionCard
        pregunta={preguntaActual.pregunta}
        dificultad={preguntaActual.dificultad}
        numero={indiceActual + 1}
        total={preguntas.length}
        opciones={preguntaActual.opciones}
        onRespuesta={manejarRespuesta}
        deshabilitado={respuestaSeleccionada}
      />

      {respuestaSeleccionada && (
  <>
    {puntosGanados > 0 && (
      <div className="alert alert-success text-center fs-4 fw-bold">
        +{puntosGanados} pts
      </div>
    )}

    <AnswerResults
      pregunta={preguntaActual}
      estadisticas={estadisticas}
    />

    <div className="text-center mt-4">
      <Button
        texto="Siguiente"
        tipo="primary"
        onClick={siguientePregunta}
      />
    </div>
  </>
)}

      <GameOverModal
        show={juegoTerminado}
        puntuacion={puntuacion}
        aciertos={aciertos}
        total={preguntas.length}
        porcentaje={Math.round((aciertos / preguntas.length) * 100)}
        onReiniciar={reiniciarJuego}
        user={user}
        config={configuracion}
      />

    </div>
  );
};

TriviaGame.propTypes = {
  configuracion: PropTypes.shape({
    cantidad: PropTypes.number.isRequired,
    categoria: PropTypes.string,
    dificultad: PropTypes.string
  }).isRequired,
  onGameComplete: PropTypes.func,
  traduccionActivada: PropTypes.bool,
  user: PropTypes.object
};

export default TriviaGame;