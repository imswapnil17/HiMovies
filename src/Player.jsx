import React, {useEffect, useRef, useState } from "react"
import Navbar from "./Navbar"
import Search from "./Search"


export default function Player({options,searchValue,searching,updateSearch}){
    let id = window.location.pathname.replace("/discover/vid","")
    console.log(id)

    const src= `https://vidsrc.xyz/embed${id}`
    let [disabled,setState] = useState(true)
    function getSearch(){
        if(searchValue.length>0){
            setState(false)
        }else{
            setState(true)
        }
    }
     function getSearch(){
        if(searchValue.length>0){
            setState(false)
        }else{
            setState(true)
        }
    }
    useEffect(()=>{
        getSearch()
    },[searchValue])

    return(
        <>
        <Navbar searching={searching} updateSearch={updateSearch}></Navbar>
        <Search options={options} searchValue={searchValue} disabled={disabled}></Search>
        {
        disabled?<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <iframe  width="1500px" height="800px" allowFullScreen src= {src} ></iframe>
        </div>:null
}
        </>
    )
}
