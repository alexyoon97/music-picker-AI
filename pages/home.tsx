import { useState } from "react"

import OpenAI_Req from "@/components/functions/moodFinder"
import { MusicGenres } from "@/components/functions/musicGenres"
import { WordAnimation } from "@/components/functions/wordAnimation"
import { Input } from "@/components/ui/input"
import Loader from "@/components/ui/loader"
import moodFinder from "../components/functions/moodFinder"
import Loader_idle from "@/components/ui/loader_idle"

type PersonData = String[]

const Home = () => {
  const [toggledGenres, setToggledGenres] = useState<PersonData[]>([])
  const [toggledMood, setToggledMood] = useState<PersonData[]>([])
  const [text, setText] = useState<String>("")
  const [loader, setLoader] = useState<Boolean>(true);
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
  const keydown_enter = async (e) => {
    if (e.code == "Enter") {
      const objRes = await OpenAI_Req(e)
      setGenresList(objRes["Genre"])
      setMoodList(objRes["Mood"])
    }
  }

  return (
    <div className="main_box">
      {loader ? <Loader_idle/> :<Loader/>}
      <div className="genre_box">
        <MusicGenres
          genresList={genresList}
          toggledGenres={toggledGenres}
          setToggledGenres={setToggledGenres}
        />
      </div>
      <div className="search_bar flex w-full max-w-lg items-center space-x-2">
        <Input
          //   onKeyDownCapture={(e) => keydown_enter(e)}
          onChange={(input) => setText(input.target.value)}
          type="text"
          className="search_engine tracking-tight"
          placeholder="Tell me What's going on around you?"
        />
      </div>
      <div>
        <WordAnimation
          moodList={moodList}
          toggledMood={toggledMood}
          setToggledMood={setToggledMood}
        />
      </div>
      <div className="music_list_box">
        <div className="toggled_box">
          <p className="toggled_child">
            {toggledGenres.map((gen) => {
              return <div className="toggled_item tracking-tight">{gen}</div>
            })}
          </p>
          <p className="toggled_child">
            {toggledMood.map((mood) => {
              return <div className="toggled_item tracking-tight">{mood}</div>
            })}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Home
