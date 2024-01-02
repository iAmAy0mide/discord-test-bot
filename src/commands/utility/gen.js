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
        await interaction.deferReply({ ephemeral: true });
        const {value: prompt} = interaction.options?.get('prompt');
        const generatedImage = await genImage(prompt);
        // const generatedImage = await generateImage(prompt);
        // console.log(generateImage);
        await interaction.editReply(generatedImage);
    }
};

async function genImage(prompt) {

    
    const options = {
        method: 'GET',
        url: 'https://text2image6.p.rapidapi.com/text2image',
        params: {
    text: prompt,
    style: 'enhance'
    },
    headers: {
        'X-RapidAPI-Key': '1e00f12f73mshae57abf9cbc02c0p11baa5jsn3d19fffb8805',
        'X-RapidAPI-Host': 'text2image6.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.url);
        return response.data.url
    } catch (error) {
        console.error(error);
        return 'Whoops! An error occur. Please try again.'
    }
}

async function generateImage(prompt) {
    
    const options = {
        method: 'GET',
        url: 'https://text-to-image7.p.rapidapi.com/',
        params: {
    prompt,
    batch_size: '1',
    },
    headers: {
        'X-RapidAPI-Key': '1e00f12f73mshae57abf9cbc02c0p11baa5jsn3d19fffb8805',
        'X-RapidAPI-Host': 'text-to-image7.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const prompt = response.data.data[0];
        // console.log(prompt);
        return prompt
    } catch (error) {
        console.error(error);
        return 'Please enter a valid text to generate image.'
    }
}