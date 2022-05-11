import { useState, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import './css/style.css';
import { api } from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  async function handleSearch() {

    if (input === '') {
      setError("CEP deve ser informado!");
      setShowInfo(true);
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setShowInfo(false);
      setInput("");

    } catch (error) {
      setError("CEP inválido!");
      setShowInfo(true);
      setInput("");
      delete Object.keys(cep);
      return;
    }


  }
  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep" value={input}
          onChange={(e) => { setInput(e.target.value) }} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      <span className='error-message' style={{ display: showInfo ? "block" : "none" }}>{error}</span>

      {console.log(Object.keys(cep).length)};

      {Object.keys(cep).length > 0 && (!showInfo) && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}

    </div>
  );
}

export default App;
