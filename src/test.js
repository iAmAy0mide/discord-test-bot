const OpenAI = require("openai");
require('dotenv').config();

const OpenAI_API_KEY = process.env.OpenAI_API_KEY

const openai = new OpenAI({
    OpenAI_API_KEY,
    temperature: 0.9,
});

async function main() {
  const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });

  console.log(image.data);
}
main();