const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const obj = req.query.obj;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Recommend me a 10 songs that is related to Music Genre and my situation, Music Genre are ${obj.genre} and I am feeling ${obj.mood} while ${obj.situ} .  Describe a song name and artist and description of this song. 
    Provide your answer in JSON form with "Description" "Song name" and "Artist" as a key. Reply with only the answer in JSON form and include no other commentary:`,
    temperature : 0,
    max_tokens : 1500,
  })
  res.status(200).json(response.data);
}
