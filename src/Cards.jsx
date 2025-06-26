import React, { useRef, useEffect, useReducer, useState } from "react"
import style from "./css/customMovie.module.css"
import { Link } from 'react-router';
import Skeleton from "./onLoad/Skeleton";

export default function Cards({ item, id, title, bgImage }) {
    const imgBaseUrl = "https://image.tmdb.org/t/p/w500"
    let switcher = "movie"
    window.location.pathname.includes('tv') ? switcher = window.location.pathname : null
    let loadRef = useRef()
    
    function loadCard() {
        if (!loadRef.current) {
            return (
               <Skeleton/>
            )


        }
        else{
            return(
                null
            )
        }
    }

    useEffect(() => {
            loadCard()
    },[loadRef])
    return (
        <>
            <Link to={switcher + '/discover/' + id} style={{ textDecoration: "none " }}>

                <div ref={item} id="card" className={style.movieItem} style={{ flexShrink: "0", textAlign: "center", width: "270px", height: "330px", borderRadius: "8px", overflow: "hidden",display:"flex",flexDirection:"column" }}>
                    {loadCard()}
                    <img ref={loadRef} className={style.card} style={{ objectFit: "cover", }} width="90%" height="90%" src={imgBaseUrl + bgImage} alt="" />

                    <span style={{ textAlign: "center", fontWeight: "bold", lineHeight: "2", color: "white" }}>{title}</span>

                </div>
            </Link>
        </>
    )
}