const axios = require('axios');
const Dev = require('../models/Dev');

const ParseStringAsArray = require('../utils/ParseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index (request, response){
        const devs = await Dev.find();

        return response.json({devs});
    },
    async store(request, response){
        
        const { github_username, techs, longitude, latitude } = request.body
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){
    
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`)
                .catch(function (error) {
                    return response.json({message: "Usuário não encontrado no Github. Tente novamente."});
                });
        
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = ParseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ]
            };
            
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
            
            //WebSocket

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

            return response.json(dev);
        }else{
            return response.json({message: "Usuário já cadastrado no sistema."});
        }

    },
    async destroy(request, response){
        const { github_username } = request.params;

        const dev = await Dev.remove({
            github_username
        });

        return response.json({ dev });
    }
}