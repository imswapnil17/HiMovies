import React, { useRef } from "react"
import style from "./css/customMovie.module.css"
import trend from "./css/trendingMovie.module.css"
import { Link } from 'react-router';

export default function ScrollTrending({ item, id, title, bgImage,  ref}) {
    const imgBaseUrl = "https://image.tmdb.org/t/p/original"
    
    return (
        <>
            <div ref={ref}  className="cardContainer" style={{height:"1000px",width:"100%",flexShrink:"0" }}>
                    
                    <div ref={item} className={trend.movieItem} style={{ background: `url(${imgBaseUrl + bgImage},)`,backgroundSize:"cover"}}>



                    </div>
            </div>
        </>
    )
}