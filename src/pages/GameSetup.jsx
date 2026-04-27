import { useState } from "react";
import Button from "../components/Button";

export default function GameSetup ({iniciarJuego}) {

    const [categoria, setCategoria] = useState("");
    const [dificultad, setDificultad] = useState("easy");
    const [cantidad, setCantidad] = useState(5);

    const categorias = [
    { value: "", label: "Cualquiera" },
    { value: "science", label: "Ciencia" },
    { value: "history", label: "Historia" },
    { value: "sports", label: "Deportes" },
    { value: "geography", label: "Geografía" },
    { value: "art", label: "Arte" },
    { value: "animals", label: "Animales" },
    { value: "general_knowledge", label: "Conocimiento general" },
    { value: "film_and_tv", label: "Películas y TV" },
    { value: "music", label: "Música" }
  ];

  return (
    <div className="container mt-4">

        <h3 className="text-center">Configurar Juego</h3>

        <div className="mb-3">
        <label>Categoría</label>
        <select
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat, index) => (
            <option key={index} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>


      <div className="mb-3">
        <label>Dificultad</label>
        <select
          className="form-select"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
        >
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>
      </div>


      <div className="mb-3">
        <label>Cantidad de preguntas</label>
        <input
          type="number"
          className="form-control"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
          max="20"
        />
      </div>


      <Button
        texto="Iniciar Juego"
        tipo="primary"
        onClick={() =>
          iniciarJuego({
            categoria,
            dificultad,
            cantidad
          })
        }
      />
      
    </div>
  );
}