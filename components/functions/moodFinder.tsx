import { motion } from "framer-motion"

import { Input } from "../ui/input"
import { MusicGenres } from "./musicGenres"
import { WordAnimation } from "./wordAnimation"

const OpenAI_Req = async (e) => {
  const input = e.target.value
  try {
    const res = await fetch(`/api/getAIResponse?input=${input}`)
    if (!res.ok) throw new Error(`error: ${res.status}`)
    const data = await res.json()
    return await JSON.parse(data.choices[0].text)
  } catch (e) {
    console.log(e, "Error")
  }
}
export default OpenAI_Req
