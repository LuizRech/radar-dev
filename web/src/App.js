import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import api from './services/api';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect( () => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data.devs)
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    
    if(response.data.message){
      alert(response.data.message);
    }else{
      setDevs([...devs, response.data]);
    }
  }

  async function handleDelDevLoad(){
    const response = await api.get('/devs');

    setDevs(response.data.devs);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastre-se</strong>
          <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onClick={handleDelDevLoad}/>
          ))}      
        </ul>
      </main>
    </div>
  );
}

export default App;