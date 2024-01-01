const { SlashCommandBuilder } = require("discord.js");

// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://robohash.p.rapidapi.com/index.php',
//   params: {text: 'mashape'},
//   headers: {
//     'X-RapidAPI-Key': '1e00f12f73mshae57abf9cbc02c0p11baa5jsn3d19fffb8805',
//     'X-RapidAPI-Host': 'robohash.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gen')
        .setDescription('Generate a random and cool looking robot image for your text.'),

    async execute(interaction) {
        await interaction.reply('Here is the robotic image');
    }
};