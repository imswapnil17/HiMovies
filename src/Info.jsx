import React, { useEffect, useReducer, useRef, useState } from "react"
import infoStyle from "./css/infoStyle.module.css"
import Search from './Search'
import Navbar from './Navbar'

import { Link, useNavigate } from "react-router"
import GetEpisodes from "./GetEpisodes"
export default function Info({ options, searchValue, updateSearch }) {
    const imgBaseUrl = "https://image.tmdb.org/t/p/w500"

    let [disabled, setState] = useState()
    const navigate = useNavigate()
    let searching = useRef()
    let id = window.location.pathname.replace("/tv/discover/","")
    let movie_id = window.location.pathname.replace("/discover", "")

    let url = `https://api.themoviedb.org/3${movie_id}?language=en-US`
    console.log(id)
    const [info, setInfo] = useState()
    async function getInfo() {
        let response = await fetch(url, options)
        response = await response.json()
        setInfo(response)
    }
    useEffect(() => {
        getInfo()

    }, [window.location.href])

    function btnHandle() {
        
        if(window.location.pathname.includes("tv")){
            let navigateLink = window.location.pathname.replace((""+id),"episodes/"+id)
            navigate(navigateLink)
        }
        else{
            let navLink = window.location.pathname.replace("discover","discover/vid")
            console.log(navLink)
            navigate(navLink)
        }
    }

    function getSearch() {
        if (searchValue.length > 0) {
            setState(false)
        } else {
            setState(true)
        }
    }
    useEffect(() => {
        getSearch()
    }, [searchValue])


    if (info) {
        return (

            <>
                <Navbar searching={searching} updateSearch={updateSearch} ></Navbar>
                <Search options={options} searchValue={searchValue} disabled={disabled} />
                {
                    disabled ? <div className={infoStyle.parentContainer}>

                        <div className={infoStyle.backgroundImage} style={{ display: "flex", height: "100%", background: `url(${imgBaseUrl + info.backdrop_path})`, backgroundSize: "cover", filter: "blur(14px)" }}></div>
                        <div className={infoStyle.container} >
                            <div className={infoStyle.content}>

                                <div className={infoStyle.movieImg}>
                                    <div className={infoStyle.rating}>



                                        <p>{info.vote_average.toFixed(1)}</p>


                                    </div>
                                    <img src={imgBaseUrl + info.poster_path} alt="" />
                                </div>

                                <div className={infoStyle.info}>
                                    <div className={infoStyle.title}>
                                        <h1>{info.original_title || info.name}</h1>

                                    </div>
                                    <div className={infoStyle?.genres}>
                                        {<div className={infoStyle.genre} >
                                            {"S" +info?.number_of_seasons}
                                        </div>}
                                        {<div className={infoStyle.genre} style={{background:"gray",color:"white",marginRight:"10px"}}>
                                            {"E" +info?.number_of_episodes}
                                        </div>}

                                        {info?.genres.map((genre) => {

                                            return (
                                                <div key={genre.id} className={infoStyle.genre}>
                                                    {genre.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button onClick={() => { btnHandle() }} className={infoStyle.playNow}>Watch now</button>
                                    <div className={infoStyle.desc}>{info.overview}</div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </>
        )

    }
}