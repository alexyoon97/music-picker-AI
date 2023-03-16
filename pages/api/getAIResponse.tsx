const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const input = req.query.input;
  const response = await openai.createCompletion({
    model: process.env.MODEL,
    prompt: `Read this sentence: ${input}.` +  process.env.PROMPT,
    temperature: process.env.TEMPERATURE,
    max_tokens: process.env.MAX_TOKENS,
  })
  res.status(200).json(response.data);
}
