const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute (interaction) {
        if (!interaction.isChatInputCommand()) {
            interaction.reply("Please use the '/gen' to generate image.");
            return;
        };

        const command = await interaction.client.commands.get(interaction.commandName);
        
        if (!command) {
            interaction.followUp("Please use the '/gen' to generate image.");
            return console.log(`No matching ${interaction.commandName} was found.`);
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }
};