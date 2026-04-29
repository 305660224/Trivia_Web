import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Timer ({tiempInicial, onTiempoFinal}) {

    const [tiempo, setTiempo] = useState(tiempInicial)

   useEffect(() => {
    if (tiempo === 0) {
      onTiempoFin();
      return;
    }

    const intervalo = setTimeout(() => {
      setTiempo(tiempo - 1);
    }, 1000);

    return () => clearTimeout(intervalo);
  }, [tiempo]);

  return (
    <div className="text-center mb-3">
      <h5 className="text-danger">Tiempo: {tiempo}s</h5>
    </div>
  );
}

Timer.propTypes = {
  tiempoInicial: PropTypes.number,
  onTiempoFin: PropTypes.func
};