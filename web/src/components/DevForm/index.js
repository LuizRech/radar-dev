import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (err) => {
            console.log(err)
            }
        );
    }, [] );

    function handleSubmit(e){
        e.preventDefault();

        onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)} />
            </div>
            
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude"
                        type="number"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>
                
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude"
                        type="number"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>

            <button type="submit">Enviar</button>

          </form>
    )
}

export default DevForm;