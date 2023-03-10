import React, { useState } from "react"

import { Toggle } from "../ui/toggle"

type GenreData = {
  Genre: String[]
}

export const MusicGenres = () => {
  const genresList = [
    "hiphop",
    "Rock",
    "Jazz",
    "EDM",
    "Country",
    "Pop",
    "Indie",
    "K-POP",
  ]
  const [toggledGenres, setToggledGenres] = useState<GenreData[]>([])

  const addGenreToList = (e) => {
    const val = e.target.value
    if (toggledGenres.includes(val)) {
      setToggledGenres(toggledGenres.filter((gen) => gen !== val))
    } else {
      setToggledGenres([...toggledGenres, val])
    }
  }

  return (
    <>
      {genresList.map((gen) => (
        <Toggle
          onClick={addGenreToList}
          key={gen}
          value={gen}
          variant="outline"
        >
          {gen}
        </Toggle>
      ))}
    </>
  )
}
