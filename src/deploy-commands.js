const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');

const { REST, Routes} = require('discord.js');

const commands =  [];

const rest = new REST.setToken(token);

const commandFolderPath = path.join(__dirname, 'commands');
const commandFolderContent = fs.readdirSync(commandFolderPath);

for ( const c of commandFolderContent) {
    const cPath = path.join(commandFolderPath, c);
    
}