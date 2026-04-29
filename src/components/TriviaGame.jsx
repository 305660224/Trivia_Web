import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import OptionsList from './OptionsList';
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

  // TIEMP SWGUN DIFICULTAD
  const getTiempoPorDificultad = (dificultad) => {
    switch (dificultad?.toLowerCase()) {
      case 'easy': return 30;
      case 'medium': return 20;
      case 'hard': return 10;
      default: return 25;
    }
  };

  // PRECARGAR PREGUNTAS AL INCIAR
  useEffect(() => {
    const cargarPreguntas = async () => {
      setCargando(true);
      try {
        const data = await TriviaApi({
          cantidad: configuracion.cantidad || 10,
          categoria: configuracion.categoria,
          dificultad: configuracion.dificultad
        });
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

  // Configurar pregunta actual cuando cambia el índice
  useEffect(() => {
    if (preguntas.length > 0 && indiceActual < preguntas.length) {
      const pregunta = preguntas[indiceActual];
      setPreguntaActual(pregunta);
      setTiempoRestante(getTiempoPorDificultad(pregunta.dificultad));
      setRespuestaSeleccionada(false);
      setMensajeFeedback('');
    }
  }, [indiceActual, preguntas]);

  // Manejar el temporizador
  useEffect(() => {
    if (cargando || juegoTerminado || respuestaSeleccionada || !preguntaActual) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Tiempo agotado o incorrecta
          if (!respuestaSeleccionada) {
            manejarTiempoAgotado();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cargando, juegoTerminado, respuestaSeleccionada, preguntaActual]);

  const manejarTiempoAgotado = useCallback(() => {
    setRespuestaSeleccionada(true);
    setMensajeFeedback('⏰ ¡Tiempo agotado!');
    
    setTimeout(() => {
      siguientePregunta();
    }, 5500);
  }, []);

  const manejarRespuesta = useCallback((respuesta) => {
    if (respuestaSeleccionada) return;
    
    setRespuestaSeleccionada(true);
    const esCorrecta = respuesta === preguntaActual?.correcta;
    
    if (esCorrecta) {
      const puntosGanados = calcularPuntos();
      setPuntuacion(prev => prev + puntosGanados);
      setAciertos(prev => prev + 1);
      setMensajeFeedback(`Correcta +${puntosGanados} puntos`);
    } else {
      setMensajeFeedback(`Incorrecto. La respuesta era: ${preguntaActual?.correcta}`);
    }
    
    setTimeout(() => {
      siguientePregunta();
    }, 1500);
  }, [preguntaActual, respuestaSeleccionada]);

  const calcularPuntos = () => {
    const puntosBase = 100;
    const multiplicadorDificultad = {
      easy: 1,
      medium: 2,
      hard: 3
    };
    const mult = multiplicadorDificultad[preguntaActual?.dificultad?.toLowerCase()] || 1;
    const puntosTiempo = Math.floor(tiempoRestante / 2);
    return puntosBase * mult + puntosTiempo;
  };

  const siguientePregunta = () => {
    const siguienteIndice = indiceActual + 1;
    
    if (siguienteIndice >= preguntas.length) {
      // Juego terminado
      setJuegoTerminado(true);
      if (onGameComplete) {
        onGameComplete({
          puntuacion,
          aciertos,
          total: preguntas.length,
          porcentaje: (aciertos / preguntas.length) * 100
        });
      }
    } else {
      setIndiceActual(siguienteIndice);
    }
  };

  const reiniciarJuego = () => {
    setJuegoTerminado(false);
    setIndiceActual(0);
    setPuntuacion(0);
    setAciertos(0);
    setRespuestaSeleccionada(false);
    setCargando(true);
    // Recargar preguntas
    const recargar = async () => {
      try {
        const data = await TriviaApi({
          cantidad: configuracion.cantidad || 10,
          categoria: configuracion.categoria,
          dificultad: configuracion.dificultad
        });
        setPreguntas(data);
      } finally {
        setCargando(false);
      }
    };
    recargar();
  };

  if (cargando) {
    return <LoadingSpinner />;
  }

  if (!preguntaActual) {
    return <div className="text-center mt-4">Error cargando la pregunta</div>;
  }

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
      />
      
      <OptionsList 
        opciones={preguntaActual.opciones}
        onSelect={manejarRespuesta}
        deshabilitado={respuestaSeleccionada}
        respuestaCorrecta={preguntaActual.correcta}
        respuestaSeleccionada={respuestaSeleccionada}
      />
      
      {mensajeFeedback && (
        <div className={`alert ${mensajeFeedback.includes('Correcto') ? 'alert-success' : mensajeFeedback.includes('Tiempo') ? 'alert-warning' : 'alert-danger'} mt-3 text-center`}>
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
    cantidad: PropTypes.number,
    categoria: PropTypes.string,
    dificultad: PropTypes.string
  }).isRequired,
  onGameComplete: PropTypes.func
};

export default TriviaGame;