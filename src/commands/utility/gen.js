const axios = require('axios');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`gen`)
        .setDescription('Generate a random and cool looking robot image for your text.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The input to echo back')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const {value: prompt} = interaction.options?.get('prompt');
        const generatedImage = await generateImage(prompt);
        await interaction.editReply(generatedImage);
    }
};

async function generateImage(prompt) {

    const options = {
    method: 'POST',
    url: 'https://animimagine-ai.p.rapidapi.com/generateImage',
    headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '1e00f12f73mshae57abf9cbc02c0p11baa5jsn3d19fffb8805',
        'X-RapidAPI-Host': 'animimagine-ai.p.rapidapi.com'
    },
    data: {
        selected_model_id: 'anything-v5',
        selected_model_bsize: '512',
        prompt,
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.message);
        return response.data.imageUrl;
    } catch (error) {
        console.error(error);
        return 'Whoops! An error occur. Please try again.'
    }
}

// async function genImage(prompt) {

    
//     const options = {
//         method: 'GET',
//         url: 'https://text2image6.p.rapidapi.com/text2image',
//         params: {
//     text: prompt,
//     style: 'enhance'
//     },
//     headers: {
//         'X-RapidAPI-Key': '1e00f12f73mshae57abf9cbc02c0p11baa5jsn3d19fffb8805',
//         'X-RapidAPI-Host': 'text2image6.p.rapidapi.com'
//     }
//     };

//     try {
//         const response = await axios.request(options);
//         return response.data.url
//     } catch (error) {
//         console.error(error);
//         return 'Whoops! An error occur. Please try again.'
//     }
// }