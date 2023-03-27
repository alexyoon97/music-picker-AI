import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Italic } from "lucide-react"

import { Toggle } from "../ui/toggle"


export const WordAnimation = ({moodList, toggledMood, setToggledMood}) => {
  const [width, setWidth] = useState<number>(0)
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  },[moodList])

  const addMoodToList = (e) => {
    const val = e.target.value
    if (toggledMood.includes(val)) {
      setToggledMood(toggledMood.filter((gen) => gen !== val))
    } else {
      setToggledMood([...toggledMood, val])
    }
  }
  return (
    <motion.div ref={carousel} className="carousel mood_box">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="inner-carousel mood_slider"
      >
        {moodList.map((item) => (
          <motion.div className="item mood_item" key={item}>
            <Toggle
              key={item}
              value={item}
              onClick={addMoodToList}
              size="lg"
              aria-label="Toggle italic"
              className="mood_item tracking-tight"
            >
              {item}
            </Toggle>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
