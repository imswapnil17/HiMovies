import {useRef, useEffect, useReducer, useState } from 'react'
import style from './css/epStyle.module.css'
import Cards from './Cards'

export default function GetEpisodes({ options, season = 1 }) {
    const id = window.location.pathname.replace("/tv/discover/episodes/", "")
    const itemRef = useRef()
    const [epData, setEpData] = useState()

    let url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`

    async function getEp() {
        let res = await fetch(url, options)
        res = await res.json()
        setEpData(res)
    }
    useEffect(() => {
        getEp()
    }, [])
    if (epData) {
        console.log(epData)
        return (
            <>
            {
                
                epData.episodes.map((eps)=>(
                   d
                ))
            
            }
            </>
        )
    }
}