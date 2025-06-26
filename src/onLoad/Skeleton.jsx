import React, { useRef } from "react"
import style from "/src/css/customMovie.module.css"
export default function Skeleton({disabled}){
   if(!disabled){
     return(
        <>
            
            <div className={style.load} style={{background:"gray",width:"260px",height:"333px",borderRadius:"10px",flexShrink:"0"}}>
                <div className={style.loadLines}></div>
                <div className={style.loadLines}></div>
                <div className={style.loadLines}></div>
                <div className={style.loadLines} ></div>
            </div>
        </>
    )
   }
}