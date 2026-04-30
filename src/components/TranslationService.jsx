// Servicio de traducción usando MyMemory API (gratuita)
export async function traducirTexto(texto, idiomaDestino = 'es') {
  if (!texto || typeof texto !== 'string') return texto;
  
  try {
    // MyMemory API - gratuita sin API key
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|${idiomaDestino}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // MyMemory devuelve la traducción en data.responseData.translatedText
    if (data.responseData && data.responseData.translatedText) {
      let traduccion = data.responseData.translatedText;
      // Limpiar etiquetas HTML que a veces agrega MyMemory
      traduccion = traduccion.replace(/<[^>]*>/g, '');
      return traduccion;
    }
    
    return texto;
  } catch (error) {
    console.error('Error en traducción:', error);
    return texto;
  }
}

// Traducir un array de preguntas completo
export async function traducirPreguntas(preguntas, activarTraduccion) {
  if (!activarTraduccion) return preguntas;
  
  const preguntasTraducidas = [];
  
  for (const pregunta of preguntas) {
    try {
      // Traducir la pregunta
      const preguntaTrad = await traducirTexto(pregunta.pregunta);
      
      // Traducir todas las opciones
      const opcionesTrad = await Promise.all(
        pregunta.opciones.map(opcion => traducirTexto(opcion))
      );
      
      // Traducir la respuesta correcta
      const correctaTrad = await traducirTexto(pregunta.correcta);
      
      preguntasTraducidas.push({
        ...pregunta,
        pregunta: preguntaTrad,
        opciones: opcionesTrad,
        correcta: correctaTrad
      });
    } catch (error) {
      console.error('Error traduciendo pregunta:', error);
      preguntasTraducidas.push(pregunta);
    }
  }
  
  return preguntasTraducidas;
}