import CustomMovieComponent from "./CustomMovieComponent"
import React, { useEffect, useRef, useState } from "react"
import Search from "./Search"
import Navbar from "./Navbar"

export default function Home({ options, searchValue, updateSearch }) {
    let searching = useRef()
    
    const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=`
    const popularMovies = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`;
    const topRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=`
    const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=`
    let [disabled, setDisabled] = useState(false)
    function searchFunc() {
        if (!searchValue) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }

    }




    useEffect(() => {
        searchFunc()
    }, [searchValue])

    return (
        <>
            <Navbar searchValue={searchValue} updateSearch={updateSearch} searching={searching}></Navbar>
            <Search options={options} searchValue={searchValue} updateSearch={updateSearch} disabled={!disabled} />
            <CustomMovieComponent options={options} title={"Top Rated Movies"} url={topRated}  disabled={disabled} />
            <CustomMovieComponent style={{ display: "none" }} options={options} title={"Popular Movies"} url={popularMovies}  disabled={disabled} />
            <CustomMovieComponent options={options} title={"Upcoming Movies"} url={upcomingMovies}  disabled={disabled} />
        </>
    )
}