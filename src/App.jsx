import React, { useState, useRef } from "react";
import notFound from "./assets/404.jpg";

const App = () => {
  const [imagem, setImagem] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userInput = inputRef.current.value;

    fetch(`https://api.github.com/users/${userInput}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setImagem(data.avatar_url);
        setName(data.name);
        setLoading(false);
      }).catch(() => {
        setImagem(notFound);
        setName("Name Not Found");
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {!loading ? (
        <div>
          <img src={imagem} alt={name} />
          <h3>{name}</h3>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <input type="text" ref={inputRef} /> {/* Adicione o atributo ref aqui */}
      <button>Pegar Perfil</button>
    </form>
  );
};

export default App;
