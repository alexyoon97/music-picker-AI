import React, { useState } from "react"

import { Toggle } from "../ui/toggle"

type PersonData = {
  Genre: String[]
  Mood: String[]
}

export const MusicGenres = ({ genresList }) => {
  const [toggledGenres, setToggledGenres] = useState<PersonData[]>([])

  const addGenreToList = (e) => {
    const val = e.target.value
    if (toggledGenres.includes(val)) {
      setToggledGenres(toggledGenres.filter((gen) => gen !== val))
    } else {
      setToggledGenres([...toggledGenres, val])
    }
  }

  return (
    <div className="Genre_list">
      {genresList.map((gen) => (
        <Toggle
          onClick={addGenreToList}
          key={gen}
          value={gen}
          variant="outline"
          className="Genre"
        >
          {gen}
        </Toggle>
      ))}
    </div>
  )
}
