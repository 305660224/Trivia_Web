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
import musicaFondo from '../audio/musica.mp3'; 
import audioRespuesta from '../audio/respuesta.mp3'; 
import './QuestionCard.css';

const TriviaGame = ({ configuracion, onGameComplete, traduccionActivada = false, user, onVolverInicio }) => {

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
  const [animacionPregunta, setAnimacionPregunta] = useState("fade-in");

  const tiempoAgotadoRef = useRef(false);
  const tiempoRef = useRef(0);
  const audioFondoRef = useRef(null);  
  const audioRespuestaRef = useRef(null); 

  
  const getTiempoPorDificultad = (dificultad) => {
    switch (dificultad?.toLowerCase()) {
      case 'easy': return 30;
      case 'medium': return 20;
      case 'hard': return 10;
      default: return 25;
    }
  };


  const calcularPuntos = (tiempoRestante, tiempoMaximo) => {
    const porcentaje = tiempoRestante / tiempoMaximo;

    if (porcentaje >= 0.75) return 200;
    if (porcentaje >= 0.5) return 150;
    if (porcentaje >= 0.25) return 120;
    return 100;
  };

  
  const pausarMusicaFondo = () => {
    if (audioFondoRef.current && !audioFondoRef.current.paused) {
      audioFondoRef.current.pause();
    }
  };


  const reanudarMusicaFondo = () => {
    if (audioFondoRef.current && audioFondoRef.current.paused && !juegoTerminado) {
      audioFondoRef.current.play().catch(error => {
        console.log("Error reproduciendo audio de fondo:", error);
      });
    }
  };

 
  const reproducirAudioRespuesta = () => {
    if (audioRespuestaRef.current) {
      audioRespuestaRef.current.currentTime = 0;
      audioRespuestaRef.current.play().catch(error => {
        console.log("Error reproduciendo audio de respuesta:", error);
      });
    }
  };


  useEffect(() => {
    const cargarPreguntas = async () => {
      setCargando(true);
      try {
        const data = await TriviaApi(configuracion, traduccionActivada);
        setPreguntas(data);
        setIndiceActual(0);
        setPuntuacion(0);
        setAciertos(0);
        setJuegoTerminado(false);
        setRespuestaSeleccionada(false);

        
        if (audioFondoRef.current) {
          audioFondoRef.current.currentTime = 0;
          audioFondoRef.current.play().catch(error => {
            console.log("Error reproduciendo audio de fondo:", error);
          });
        }
      } catch (error) {
        console.error('Error cargando preguntas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPreguntas();
  }, [configuracion, traduccionActivada]);

  
  useEffect(() => {
    if (preguntas.length > 0 && indiceActual < preguntas.length) {
      const pregunta = preguntas[indiceActual];

      const tiempoInicial = getTiempoPorDificultad(pregunta.dificultad);

      setPreguntaActual(pregunta);
      setTiempoRestante(tiempoInicial);
      tiempoRef.current = tiempoInicial;

      setRespuestaSeleccionada(false);
      setPuntosGanados(0);
      setAnimacionPregunta("fade-in");

      tiempoAgotadoRef.current = false;

      const conteo = {}
      pregunta.opciones.forEach(op => {
        conteo[op] = 0
      });
      setEstadisticas(conteo)
    }
  }, [indiceActual, preguntas]);

  
  const siguientePregunta = useCallback(() => {
    setAnimacionPregunta("fade-out");

    setTimeout(() => {
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

        reanudarMusicaFondo();

        return siguiente;
      });
    }, 400);
  }, [preguntas.length, onGameComplete, puntuacion, aciertos]);

  
  const manejarTiempoAgotado = useCallback(() => {
    if (respuestaSeleccionada || tiempoAgotadoRef.current) return;

    tiempoAgotadoRef.current = true;
    setRespuestaSeleccionada(true);

    
    pausarMusicaFondo();

    
    reproducirAudioRespuesta();

  }, [respuestaSeleccionada]);

 
  useEffect(() => {
    if (cargando || juegoTerminado || respuestaSeleccionada || !preguntaActual) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        const nuevoTiempo = prev - 1;
        tiempoRef.current = nuevoTiempo;

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

  
  const manejarRespuesta = useCallback((respuesta) => {
    if (respuestaSeleccionada) return;

    setRespuestaSeleccionada(true);
    setPuntosGanados(0)

    
    pausarMusicaFondo();

    
    reproducirAudioRespuesta();

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

  }, [preguntaActual, respuestaSeleccionada]);


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

        
        if (audioFondoRef.current) {
          audioFondoRef.current.currentTime = 0;
          audioFondoRef.current.play().catch(error => {
            console.log("Error reproduciendo audio de fondo:", error);
          });
        }
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
       <audio ref={audioFondoRef} src={musicaFondo} loop />

      
      <audio ref={audioRespuestaRef} src={audioRespuesta} />

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

      <div className={animacionPregunta}>
        <QuestionCard
          pregunta={preguntaActual.pregunta}
          dificultad={preguntaActual.dificultad}
          numero={indiceActual + 1}
          total={preguntas.length}
          opciones={preguntaActual.opciones}
          onRespuesta={manejarRespuesta}
          deshabilitado={respuestaSeleccionada}
        />
      </div>

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
      onVolverInicio={onVolverInicio}
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