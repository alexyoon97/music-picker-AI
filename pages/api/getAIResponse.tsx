const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const input = req.query.input;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Read this sentence: ${input}.Give me 6 most relevant music genres, and 10 most relevant mood words. 
    Provide your answer in JSON form with "Genre" and "Mood" as a key. Reply with only the answer in JSON form and include no other commentary:`,
    temperature : 0.8,
    max_tokens : 1000,
    top_p : 1,
    best_of : 2
  })
  res.status(200).json(response.data);
}
