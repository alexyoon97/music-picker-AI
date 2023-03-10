import { Italic } from "lucide-react"
import React, { useState } from "react"

import { Toggle } from "../ui/toggle"

type PersonData = {
    Genre: String[],
    Mood: String[]
  }

export const WordAnimation = ({ moodList }) => {
    const [toggledMood, setToggledMood] = useState<PersonData[]>([])

    const addMoodToList = (e) => {
      const val = e.target.value
      if (toggledMood.includes(val)) {
        setToggledMood(toggledMood.filter((gen) => gen !== val))
      } else {
        setToggledMood([...toggledMood, val])
      }
    }
  return (
    <>
      {moodList.map((item) => (
        <Toggle onClick={addMoodToList} size="lg" aria-label="Toggle italic">
          {item}
        </Toggle>
      ))}
    </>
  )
}
