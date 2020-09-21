import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);

  useEffect(() => {}, [repositories])

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: "Desafio Node.jsx",
      url: "http://github.com/GuiOrtiz777", 
      techs: ["Node.js", "Vanila.js"], 
      likes: 0 
    }).then(response => {
      const repository = response.data;

      setRepositories([...repositories, repository])
    }).catch(err => alert(`Service error ${err}`));
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch(err) {
      alert(`Service error ${err}`)
    }
     
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
       })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
