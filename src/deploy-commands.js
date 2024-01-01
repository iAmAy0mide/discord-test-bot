const fs = require('fs');
const path = require('path');
const { token, clientId, guildId } = require('./config.json');

const { REST, Routes} = require('discord.js');

const commands =  [];

const commandFolderPath = path.join(__dirname, 'commands');
const commandFolderContent = fs.readdirSync(commandFolderPath);

for ( const c of commandFolderContent) {
    const cPath = path.join(commandFolderPath, c);
    const commandFiles = fs.readdirSync(cPath).filter(file => file.endsWith('.js'));
    
    for (const files of commandFiles) {
        const commandFilePath = path.join(cPath, files);
        const command = require(commandFilePath);
        
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {

        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} applications`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {
                body: commands
            }
        );
        console.log(`Successfully reloaded ${data.length} commands (/) application`);
    } catch (error) {
        console.error(error);
    }
})();