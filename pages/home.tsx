import { useEffect, useRef, useState } from "react"

import OpenAI_Req from "@/components/functions/moodFinder"
import { MusicGenres } from "@/components/functions/musicGenres"
import { WordAnimation } from "@/components/functions/wordAnimation"
import { Input } from "@/components/ui/input"
import Loader from "@/components/ui/loader"
import "react-multi-carousel/lib/styles.css"
import OpenAI_Req_Genereate_Music from "@/components/functions/musicListGenerator"
import { SongCard } from "@/components/functions/songCard"
import { Button } from "@/components/ui/button"
import Loader_idle from "@/components/ui/loader_idle"

type PersonData = String[]

const Home = () => {
  const [toggledGenres, setToggledGenres] = useState<PersonData[]>([])
  const [toggledMood, setToggledMood] = useState<PersonData[]>([])
  const [text, setText] = useState<String>("")
  const [loader, setLoader] = useState<Boolean>(true)
  const [showGenButton, setShowGenButton] = useState<Boolean>(false)

  const [genresList, setGenresList] = useState<String[]>([
    // "Pop",
    // "Rock",
    // "Jazz",
    // "Blues",
    // "Reggae",
    // "Folk",
  ])
  const [moodList, setMoodList] = useState<String[]>([
    // "Cheerful",
    // "Joyful",
    // "Energetic",
    // "Uplifting",
    // "Relaxed",
    // "Calm",
    // "Peaceful",
    // "Refreshing",
    // "Optimistic",
    // "Inspiring",
  ])
  const [musicList, setMusicList] = useState<Object>([
    // {
    //   Description:
    //     "This song is about staying motivated and passionate while working hard to achieve your goals.",
    //   "Song name": "Work Hard Play Hard",
    //   Artist: "Wiz Khalifa",
    //   Link: "https://www.youtube.com/watch?v=EIdtVfCgs0o",
    // },
    // {
    //   Description:
    //     "This song is about setting goals to succeed and how to act when achieving those goals.",
    //   "Song name": "A Milli",
    //   Artist: "Lil Wayne",
    //   Link: "https://www.youtube.com/watch?v=ak2ZF9Rc6PI",
    // },
    // {
    //   Description:
    //     "This song is about striving to be the best, no matter the odds.",
    //   "Song name": "The Climb",
    //   Artist: "Miley Cyrus",
    //   Link: "https://www.youtube.com/watch?v=NG2zyeVRcbs",
    // },
    // {
    //   Description:
    //     "This song is about always reaching for the stars and never giving up.",
    //   "Song name": "Stronger",
    //   Artist: "Kanye West",
    //   Link: "https://www.youtube.com/watch?v=PsO6ZnUZI0g",
    // },
    // {
    //   Description:
    //     "This song is about staying motivated to reach your goals, no matter how hard the process might be.",
    //   "Song name": "Glory",
    //   Artist: "Jay Z & Kanye West",
    //   Link: "https://www.youtube.com/watch?v=uO59tfQ2TbA",
    // },
    // {
    //   Description:
    //     "This song is about staying focused and working hard to reach success.",
    //   "Song name": "Hall of Fame",
    //   Artist: "The Script & will.i.am",
    //   Link: "https://www.youtube.com/watch?v=mk48xRzuNvA",
    // },
    // {
    //   Description:
    //     "This song is about staying focused and never giving up, even when times get hard.",
    //   "Song name": "Lost One",
    //   Artist: "Jay-Z",
    //   Link: "https://www.youtube.com/watch?v=JnKQ2Eas_SY",
    // },
    // {
    //   Description:
    //     "This song is about rising above all the doubt and frustration to reach your goals.",
    //   "Song name": "Never Give Up",
    //   Artist: "Sia",
    //   Link: "https://www.youtube.com/watch?v=C-u5WLJ9Yk4",
    // },
    // {
    //   Description:
    //     "This song is about reaching success, no matter what anyone else thinks.",
    //   "Song name": "The Bottom",
    //   Artist: "Lil Baby & Gunna",
    //   Link: "https://www.youtube.com/watch?v=qLm6ospTSYI",
    // },
    // {
    //   Description:
    //     "This song is about how with hard work and dedication, you can make your dreams a reality.",
    //   "Song name": "Lose Yourself",
    //   Artist: "Eminem",
    //   Link: "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
    // },
  ])

  const keydown_enter = async (e) => {
    if (e.code == "Enter") {
      setMusicList([]);
      setGenresList([]);
      setMoodList([]);
      setToggledGenres([]);
      setToggledMood([]);
      setLoader(false)

      const objRes = await OpenAI_Req(e)
      setGenresList(objRes["Genre"])
      setMoodList(objRes["Mood"])
      setLoader(true);
      setShowGenButton(true);
    }
  }
  const getMusicList = async () => {
    const obj = {
      genre: toggledGenres,
      mood: toggledMood,
      situ: text,
    }
    setLoader(false)
    console.log(obj.genre, obj.mood, obj.situ)
    try {
      const objRes = await OpenAI_Req_Genereate_Music(obj)
      setMusicList(objRes)
      setLoader(true)
    } catch (e) {
      console.log(e, "error")
    }
  }

  return (
    <div className="main_box">
      <div className="genre_box">
        <MusicGenres
          genresList={genresList}
          toggledGenres={toggledGenres}
          setToggledGenres={setToggledGenres}
        />
      </div>
      <div className="search_box">
        {loader ? <Loader_idle /> : <Loader />}
        <div className="search_bar flex w-full max-w-lg items-center space-x-2">
          <Input
            onKeyDownCapture={(e) => keydown_enter(e)}
            onChange={(input) => setText(input.target.value)}
            type="text"
            className="search_engine tracking-tight"
            placeholder="Tell me What's going on around you?"
          />
        </div>
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
          {showGenButton ? (
            <Button
              className="gen_button"
              onClick={getMusicList}
              variant="subtle"
            >
              Generate
            </Button>
          ) : (
            <div></div>
          )}
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
        <div className="playlist_box">
          <SongCard musicList={musicList} />
        </div>
      </div>
    </div>
  )
}

export default Home
