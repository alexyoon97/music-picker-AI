import { motion } from "framer-motion"

import { Input } from "../ui/input"
import { MusicGenres } from "./musicGenres"
import { WordAnimation } from "./wordAnimation"

const OpenAI_Req_Genereate_Music = async (e) => {
  const input = e
  try {
    const res = await fetch(`/api/getAIMusicList?input=${input}`)
    if (!res.ok) throw new Error(`error: ${res.status}`)
    const data = await res.json()
    return await JSON.parse(data.choices[0].text)
  } catch (e) {
    console.log(e, "Error")
  }
}
export default OpenAI_Req_Genereate_Music
