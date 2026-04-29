import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Timer({ tiempoInicial, onTiempoFin }) {

  const [tiempo, setTiempo] = useState(tiempoInicial);

  
  useEffect(() => {
    setTiempo(tiempoInicial);
  }, [tiempoInicial]);

  
  useEffect(() => {
    if (tiempo <= 0) {
      onTiempoFin(); 
      return;
    }

    const intervalo = setTimeout(() => {
      setTiempo((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(intervalo);
  }, [tiempo, onTiempoFin]);

  return (
    <div className="text-center mb-3">
      <h5 className="text-danger">Tiempo: {tiempo}s</h5>
    </div>
  );
}

Timer.propTypes = {
  tiempoInicial: PropTypes.number.isRequired,
  onTiempoFin: PropTypes.func.isRequired
};