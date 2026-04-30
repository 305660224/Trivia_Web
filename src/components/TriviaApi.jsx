import { traducirPreguntas } from './TranslationService';

export async function TriviaApi(config, traduccionActivada = false) {
    try {
        let url = `https://the-trivia-api.com/api/questions?limit=${config.cantidad}`;

        if (config.categoria) {
            url += `&categories=${config.categoria}`;
        }

        if (config.dificultad) {
            url += `&difficulty=${config.dificultad}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Error en la API");
        }

        const data = await res.json();

        let preguntas = data.map(p => {
            let textoPregunta = "";

            if (typeof p.question === "string") {
                textoPregunta = p.question;
            } else if (p.question?.text) {
                textoPregunta = p.question.text;
            } else {
                textoPregunta = "Pregunta no disponible";
            }

            return {
                pregunta: textoPregunta,
                opciones: [...p.incorrectAnswers, p.correctAnswer]
                    .sort(() => Math.random() - 0.5),
                correcta: p.correctAnswer,
                dificultad: p.difficulty
            };
        });

        // Traducir si está activado
        if (traduccionActivada) {
            preguntas = await traducirPreguntas(preguntas, true);
        }

        return preguntas;

    } catch (error) {
        console.error(error);
        throw error;
    }
}