import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Carousel from "react-multi-carousel"
import YouTube from "react-youtube"

export const SongCard = ({musicList}) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }
  const [width, setWidth] = useState<number>(0)

  const carousel = useRef(null)

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [musicList])

  return (
    <motion.div ref={carousel} className="carousel">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="inner-carousel playlist_slider"
      >
        {musicList ? (
          Object.keys(musicList).map((key, index) => {
            return (
              <motion.div key={key} className="item song_card tracking-tight">
                <YouTube
                  videoId={musicList[key]["Link"].split("v=")[1].split("&")[0]}
                  opts={opts}
                  className="youtube_vid"
                />
                <div className="song_info_div">
                  <div style={{ fontSize: "2vh" }} className="song_info">
                    {musicList[key]["Song name"]}
                  </div>
                  <div style={{ fontSize: "1.5vh" }} className="song_info">
                    {musicList[key]["Artist"]}
                  </div>
                  <div style={{ fontSize: "1.3vh" }} className="song_info">
                    {musicList[key]["Description"]}
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <div></div>
        )}
      </motion.div>
    </motion.div>
  )
}
