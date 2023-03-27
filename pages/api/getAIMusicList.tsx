const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const obj = req.query.input
  const prompt = `Recommend me 10 songs related to Music Genre and my situation, Music Genre are ${obj.genre} and I am feeling ${obj.mood} while ${obj.situ} .  Describe a song name and artist and description of this song with youtube link. 
  Provide your answer in JSON form with "Description", "Song name", "Artist" and "Link" as a key. Reply with only the answer in JSON form and include no other commentary:`

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 1500,
  })
  res.status(200).json(response.data)
}
