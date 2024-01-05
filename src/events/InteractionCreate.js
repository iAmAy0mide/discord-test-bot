const { Events } = require("discord.js");
const { readFile } = require('fs');
const { join } = require('path');


module.exports = {
    name: Events.InteractionCreate,
    async execute (interaction) {
        if (!interaction.isChatInputCommand()) {
            interaction.followUp(`<head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>WeaCanion - bot</title>
            <style>
                body {
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    margin: 10px 20px;
                }
                .container {
                    width: 100%;
                    height: 100%;
                    max-width: 400px;
                    border: 5px solid rgba(30, 143, 255, 0.236);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    background-color: chocolate;
                }
                .inner-container {
                    padding: .28rem;
                }
                .info {
                    color: #ccc;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="inner-container">
                    <p class="icon">😉</p>
                    <p class="info">Please use the '/gen' command to generate image.</p>
                </div>
            </div>
        </body>`);
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