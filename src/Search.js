import React from "react"
import { useSearchParams } from "react-router-dom"

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const term = searchParams.get("term")
  const location = searchParams.get("location")

  return (
    <div className="App">
      <p>Value of term: {term}</p>
      <p>Value of location: {location}</p>
    </div>
  )
}

export default Search