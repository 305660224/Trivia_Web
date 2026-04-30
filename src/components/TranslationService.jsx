
export async function traducirTexto(texto, idiomaDestino = 'es') {
  if (!texto || typeof texto !== 'string') return texto;
  
  try {
   
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|${idiomaDestino}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    
    if (data.responseData && data.responseData.translatedText) {
      let traduccion = data.responseData.translatedText;
      
      traduccion = traduccion.replace(/<[^>]*>/g, '');
      return traduccion;
    }
    
    return texto;
  } catch (error) {
    console.error('Error en traducción:', error);
    return texto;
  }
}


export async function traducirPreguntas(preguntas, activarTraduccion) {
  if (!activarTraduccion) return preguntas;
  
  const preguntasTraducidas = [];
  
  for (const pregunta of preguntas) {
    try {
   
      const preguntaTrad = await traducirTexto(pregunta.pregunta);
      
     
      const opcionesTrad = await Promise.all(
        pregunta.opciones.map(opcion => traducirTexto(opcion))
      );
      
    
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