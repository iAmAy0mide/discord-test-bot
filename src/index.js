const fs = require('fs');
const path = require('path');
const {
    Client,
    GatewayIntentBits,
    Collection,
} = require('discord.js');
const { token } = require('./config.json')

const client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

client.commands = new Collection();

const commandFolder = path.join(__dirname, 'commands');
const commandFolderContent = fs.readdirSync(commandFolder);

for (const c of commandFolderContent) {
    const cPath = path.join(commandFolder, c);
    const commandFiles = fs.readdirSync(cPath).filter(file => file.endsWith('.js'));

    for (const files of commandFiles) {
        const commandFilesPath = path.join(cPath, files);
        const command = require(commandFilesPath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.commandName, command);
        } else {
            return console.error('Missing data or execute property on command.');
        }
    }
}

const eventsFolderPath = path.join(__dirname, 'events');
const eventsFolder = fs.readdirSync(eventsFolderPath).filter(event => event.endsWith('.js'));

for (const events of eventsFolder) {
    const eventPath = path.join(eventsFolderPath, events)
    const event = require(eventPath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token)