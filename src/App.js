import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: `Desafio feito as ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: [
        "React", "Node"
      ]
    });

    const repo = res.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);
    console.log(res.status);
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => (
          <> 
            <li key={ repo.id }>{ repo.title }</li>
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
