const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute (interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            return console.log(`No matching ${interaction.commandName} was found.`);
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true})
            } else {
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})
            }
        }
    }
};