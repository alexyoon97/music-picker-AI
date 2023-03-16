import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "../ui/input"
import { MusicGenres } from "./musicGenres"
import { WordAnimation } from "./wordAnimation"

export const MoodFinderAI = () => {
  const [text, setText] = useState<String>("")
  const [genresList, setGenresList] = useState<String[]>([
    "Pop",
    "Rock",
    "Jazz",
    "Blues",
    "Reggae",
    "Folk",
  ])
  const [moodList, setMoodList] = useState<String[]>([
    "Cheerful",
    "Joyful",
    "Energetic",
    "Uplifting",
    "Relaxed",
    "Calm",
    "Peaceful",
    "Refreshing",
    "Optimistic",
    "Inspiring",
  ])

  const OpenAI_Req = async (e) => {
    if (e.code == "Enter") {
      const input = e.target.value
      try {
        const res = await fetch(`/api/getAIResponse?input=${input}`);
        if (!res.ok) throw new Error(`error: ${res.status}`);
        const data = await res.json();
        const objRes = JSON.parse(data.choices[0].text);

        setGenresList[objRes["Music Genres"]];
        setMoodList[objRes["Music Genres"]];

      } catch (e) {
        console.log(e, "Error")
      }
    }
  }
  return (
    <>
      <div className="genre_box">
        <MusicGenres genresList={genresList} />
      </div>
      <div className="search_bar flex w-full max-w-lg items-center space-x-2">
        <Input
          // onKeyDownCapture={(e) => OpenAI_Req(e)}
          onChange={(input) => setText(input.target.value)}
          type="text"
          placeholder="Tell me more about your Mood"
        />
      </div>
      <div>
        <WordAnimation moodList={moodList} />
      </div>
    </>
  )
}
