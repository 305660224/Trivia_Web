import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import TimerProgress from './TimerProgress';
import ScoreBoard from './ScoreBoard';
import GameOverModal from './GameOverModal';
import LoadingSpinner from './LoadingSpinner';
import { TriviaApi } from './TriviaApi';

const TriviaGame = ({ configuracion, onGameComplete }) => {

  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');

  const tiempoAgotadoRef = useRef(false);

  const getTiempoPorDificultad = (dificultad) => {
    switch (dificultad?.toLowerCase()) {
      case 'easy': return 30;
      case 'medium': return 20;
      case 'hard': return 10;
      default: return 25;
    }
  };

  useEffect(() => {
    const cargarPreguntas = async () => {
      setCargando(true);
      try {
        const data = await TriviaApi(configuracion);
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
  }, [configuracion]);

  useEffect(() => {
    if (preguntas.length > 0 && indiceActual < preguntas.length) {
      const pregunta = preguntas[indiceActual];
      setPreguntaActual(pregunta);
      setTiempoRestante(getTiempoPorDificultad(pregunta.dificultad));
      setRespuestaSeleccionada(false);
      setMensajeFeedback('');

      tiempoAgotadoRef.current = false; 
    }
  }, [indiceActual, preguntas]);

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

  const manejarTiempoAgotado = useCallback(() => {
    if (respuestaSeleccionada || tiempoAgotadoRef.current) return;

    tiempoAgotadoRef.current = true;

    setRespuestaSeleccionada(true);
    setMensajeFeedback('⏰ ¡Tiempo agotado!');

    setTimeout(() => {
      siguientePregunta();
    }, 1500);

  }, [respuestaSeleccionada, siguientePregunta]);

  
  useEffect(() => {
    if (cargando || juegoTerminado || respuestaSeleccionada || !preguntaActual) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          manejarTiempoAgotado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cargando, juegoTerminado, respuestaSeleccionada, preguntaActual, manejarTiempoAgotado]);

  
  const manejarRespuesta = useCallback((respuesta) => {
    if (respuestaSeleccionada) return;

    setRespuestaSeleccionada(true);

    const esCorrecta = respuesta === preguntaActual?.correcta;

    if (esCorrecta) {
      setPuntuacion(prev => prev + 100);
      setAciertos(prev => prev + 1);
      setMensajeFeedback('✅ Correcta');
    } else {
      setMensajeFeedback(`❌ Incorrecto. Era: ${preguntaActual?.correcta}`);
    }

    setTimeout(() => {
      siguientePregunta();
    }, 1500);

  }, [preguntaActual, respuestaSeleccionada, siguientePregunta]);

  
  const reiniciarJuego = () => {
    setJuegoTerminado(false);
    setIndiceActual(0);
    setPuntuacion(0);
    setAciertos(0);
    setRespuestaSeleccionada(false);
    setCargando(true);

    const recargar = async () => {
      try {
        const data = await TriviaApi(configuracion);
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

      {mensajeFeedback && (
        <div className={`alert ${
          mensajeFeedback.includes('Correcta')
            ? 'alert-success'
            : mensajeFeedback.includes('Tiempo')
            ? 'alert-warning'
            : 'alert-danger'
        } mt-3 text-center`}>
          {mensajeFeedback}
        </div>
      )}

      <GameOverModal
        show={juegoTerminado}
        puntuacion={puntuacion}
        aciertos={aciertos}
        total={preguntas.length}
        porcentaje={Math.round((aciertos / preguntas.length) * 100)}
        onReiniciar={reiniciarJuego}
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
  onGameComplete: PropTypes.func
};

export default TriviaGame;