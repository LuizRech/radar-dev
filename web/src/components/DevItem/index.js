import React from 'react';
import { FiX } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

function DevItem({ dev, onClick }){
  async function handleDelDev(github_username){
    await api.delete(`/dev/${github_username}`);

    onClick();
  }
    return(
        <li className="dev-item">
          <div className="delDev">
            <FiX className="delDevItem" onClick={() => handleDelDev(dev.github_username)}/>
          </div>
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`http://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
     </li>
    )
}

export default DevItem;