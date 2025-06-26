import CustomMovieComponent from "./CustomMovieComponent"
import React, { useEffect, useRef, useState } from "react"
import Search from "./Search"
import Navbar from "./Navbar"
import { Outlet } from "react-router"

export default function Tv({ options, searchValue, updateSearch }) {
    let searching = useRef()
    
    const popularMovies = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=`;
    const topRated = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=`
    let [disabled, setDisabled] = useState(false)
  




    useEffect(() => {
        if (!searchValue) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [searchValue])

    return (
        <>

            <Navbar searchValue={searchValue} updateSearch={updateSearch} searching={searching}></Navbar>
            
            <Search options={options} searchValue={searchValue} disabled={!disabled} />
            <CustomMovieComponent options={options} title={"Top Rated TV Shows"} url={topRated} disabled={disabled} />
            <CustomMovieComponent style={{ display: "none" }} options={options} title={"Popular TV shows"} url={popularMovies} disabled={disabled} />

        </>
    )
}