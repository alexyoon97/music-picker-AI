import { useEffect, useRef, useState } from "react"
import Carousel from "react-multi-carousel"

import OpenAI_Req from "@/components/functions/moodFinder"
import { MusicGenres } from "@/components/functions/musicGenres"
import { WordAnimation } from "@/components/functions/wordAnimation"
import { Input } from "@/components/ui/input"
import Loader from "@/components/ui/loader"
import "react-multi-carousel/lib/styles.css"
import { motion } from "framer-motion"

import OpenAI_Req_Genereate_Music from "@/components/functions/musicListGenerator"
import { Button } from "@/components/ui/button"
import Loader_idle from "@/components/ui/loader_idle"

type PersonData = String[]

const Home = () => {
  const [toggledGenres, setToggledGenres] = useState<PersonData[]>([])
  const [toggledMood, setToggledMood] = useState<PersonData[]>([])
  const [text, setText] = useState<String>("")
  const [loader, setLoader] = useState<Boolean>(true)
  const [width, setWidth] = useState<number>(0)
  const carousel = useRef(null)
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
    //     "A fast-paced, upbeat song with a catchy chorus and a strong beat",
    //   "Song name": "Uptown Funk",
    //   Artist: "Mark Ronson ft. Bruno Mars",
    // },
    // {
    //   Description:
    //     "A classic hip-hop song with empowering lyrics and chilled out vocals",
    //   "Song name": "The Message",
    //   Artist: "Grandmaster Flash",
    // },
    // {
    //   Description:
    //     "A powerful and uplifting pop song with an infectious beat and inspiring lyrics",
    //   "Song name": "Stronger",
    //   Artist: "Kelly Clarkson",
    // },
    // {
    //   Description:
    //     "An upbeat and bouncy jazz song with a catchy melody and joyful atmosphere",
    //   "Song name": "Take The A Train",
    //   Artist: "Duke Ellington and his Orchestra",
    // },
    // {
    //   Description:
    //     "An energetic hip-hop track with a strong beat and uplifting lyrics",
    //   "Song name": "Glory",
    //   Artist: "Common ft John Legend",
    // },
    // {
    //   Description:
    //     "A driving pop-rock song with a foot-tapping beat and a chorus that will get stuck in your head",
    //   "Song name": "Eye of the Tiger",
    //   Artist: "Survivor",
    // },
    // {
    //   Description:
    //     "A funky, soulful jazz song with a groovy bass line and an infectious rhythm",
    //   "Song name": "Ain't No Stopping Us Now",
    //   Artist: "McFadden & Whitehead",
    // },
    // {
    //   Description:
    //     "A fun and energetic hip-hop song with a powerful beat and inspiring lyrics",
    //   "Song name": "Can't Hold Us",
    //   Artist: "Macklemore & Ryan Lewis ft. Ray Dalton",
    // },
    // {
    //   Description:
    //     "A classic pop-rock song with a driving beat and uplifting lyrics",
    //   "Song name": "Don't Stop Believin'",
    //   Artist: "Journey",
    // },
    // {
    //   Description:
    //     "An uplifting jazz ballad with a smooth melody and relaxed rhythm",
    //   "Song name": "My Funny Valentine",
    //   Artist: "Chet Baker",
    // },
  ])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const keydown_enter = async (e) => {
    if (e.code == "Enter") {
      setLoader(false)
      const objRes = await OpenAI_Req(e)
      setGenresList(objRes["Genre"])
      setMoodList(objRes["Mood"])
      setLoader(true)
      setShowGenButton(true)
    }
  }
  const getMusicList = async () => {
    const obj = {
      genre: toggledGenres,
      mood: toggledMood,
      situ: text
    }
    setLoader(false);
    console.log(obj.genre, obj.mood, obj.situ);
    try {
      const objRes = await OpenAI_Req_Genereate_Music(obj)
      setMusicList(objRes)
      setLoader(true)
    } catch (e) {
      console.log(e, "error");
    }
  }
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [musicList])

  return (
    <div className="main_box">
      {loader ? <Loader_idle /> : <Loader />}
      <div className="genre_box">
        <MusicGenres
          genresList={genresList}
          toggledGenres={toggledGenres}
          setToggledGenres={setToggledGenres}
        />
      </div>
      <div className="search_bar flex w-full max-w-lg items-center space-x-2">
        <Input
          onKeyDownCapture={(e) => keydown_enter(e)}
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
          {showGenButton ? (
            <Button className="gen_button" onClick={getMusicList} variant="subtle">
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
          <motion.div ref={carousel} className="carousel">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="inner-carousel playlist_slider"
            >
              {musicList ? (
                Object.keys(musicList).map((key, index) => {
                  return (
                    <motion.div className="item song_card tracking-tight">
                      <div style={{ fontSize: "1.7vh" }} className="song_info">
                        {musicList[key]["Song name"]}
                      </div>
                      <div style={{ fontSize: "1.3vh" }} className="song_info">
                        {musicList[key]["Artist"]}
                      </div>
                      <div style={{ fontSize: "1.3vh" }} className="song_info">
                        {musicList[key]["Description"]}
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div></div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home
