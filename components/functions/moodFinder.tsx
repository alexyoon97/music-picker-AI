import { useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { MusicGenres } from "./musicGenres"
import { WordAnimation } from "./wordAnimation"

export const MoodFinderAI = () => {
  const [text, setText] = useState<String>("");
  const genresList = [
    "hiphop",
    "Rock",
    "Jazz",
    "EDM",
    "Country",
    "Pop",
    "Indie",
    "K-POP",
    "K-POP",
    "K-POP",
    "K-POP",
    "K-POP",

  ]
  const moodList = [
    "Bored",
    "Sleepy",
    "Calm",
    "Relaxed",
    "Cheerful",
    "Loved",
    "Peaceful",
    "K-Energetic",
    "Cold",
    "Refreshed",
    "Happy"
  ]
  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          onChange={(input) => setText(input.target.value)}
          type="text"
          placeholder="Tell me more about your Mood"
        />
      </div>
      <MusicGenres genresList = {genresList}/><br></br>
      <WordAnimation moodList = {moodList}/>
    </>
  )
}
