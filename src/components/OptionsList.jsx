import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const OptionsList = ({ opciones, onSelect, deshabilitado, respuestaCorrecta, respuestaSeleccionada }) => {
  const [respuestaUsuario, setRespuestaUsuario] = useState(null);

  const handleSelect = (opcion) => {
    if (deshabilitado) return;
    setRespuestaUsuario(opcion);
    onSelect(opcion);
  };

  const getButtonType = (opcion) => {
    if (!respuestaSeleccionada) return 'secondary';
    if (opcion === respuestaCorrecta) return 'success';
    if (opcion === respuestaUsuario && opcion !== respuestaCorrecta) return 'danger';
    return 'secondary';
  };

  return (
    <div className="row g-3 mt-2">
      {opciones?.map((opcion, index) => (
        <div key={index} className="col-12 col-md-6">
          <Button
            texto={opcion}
            tipo={getButtonType(opcion)}
            className="w-100 py-3"
            onClick={() => handleSelect(opcion)}
            disable={deshabilitado}
          />
        </div>
      ))}
    </div>
  );
};

OptionsList.propTypes = {
  opciones: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  deshabilitado: PropTypes.bool,
  respuestaCorrecta: PropTypes.string,
  respuestaSeleccionada: PropTypes.bool
};

export default OptionsList;