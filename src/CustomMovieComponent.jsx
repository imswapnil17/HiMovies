import React, { useEffect, useRef, useState } from 'react'
import Cards from './Cards';
import style from './css/customMovie.module.css'
import { Route, Routes } from 'react-router';
let API_KEY = '7dcd8f058e1ff9eb57b21a7ed443f033';
import Spinner from './Spinner'
import Skeleton from './onLoad/Skeleton';
export default function CustomMovieComponent({ title, url, options,disabled}) {
    const scrollRef = useRef()

    const [btnState, setBtn] = useState("none")

    const itemRef = useRef()

    const [isloading, setLoading] = useState(true)

    const [page, setPage] = useState(1)

    const [popularMoviesData, setPopularMoviesData] = useState();

    const getInfo = async () => {
        let response = await fetch(url + page, options);
        response = await response.json();

        if (popularMoviesData) {
            // Combine old and new results
            const combinedResults = [...popularMoviesData.results, ...response.results];
            // Use a Map to filter unique movies by 'id'
            const uniqueResultsMap = new Map();
            combinedResults.forEach(movie => {
                uniqueResultsMap.set(movie.id, movie);
            });

            // Convert map values back to an array
            const uniqueResults = Array.from(uniqueResultsMap.values());

            setPopularMoviesData({
                ...popularMoviesData,
                results: uniqueResults,
            });
        } else {
            setPopularMoviesData(response);
        }





    }

    const [loadstate, setLoad] = useState(false)
    function loading() {
        return (
            <>
                {loadstate ? <Spinner /> : null}
            </>
        )
    }
    function next() {
        let pos = scrollRef.current.getBoundingClientRect().x

        scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft + scrollRef.current.getBoundingClientRect().width + pos, behavior: 'smooth' })
    }

    function prev() {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft - 120 * 7, behavior: 'smooth' })
    }
    function watchItem(item) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(async (entry) => {
                await new Promise(r => setTimeout(r, 1000))
                if (entry.isIntersecting) {
                    setPage(page + 1)

                }
                else {
                    setLoad(true)
                }
            })
        })
        observer.observe(item);
    }


    async function updatePage() {
        if (itemRef.current) {
            watchItem(itemRef.current)
        }

    }
    useEffect(()=>{
        updatePage() 
       
    })
    useEffect(() => {
        getInfo()
        updatePage()
        setLoad(false)
         setTimeout(() => {
            setLoading(false)
        }, 2000);  

    }, [page])
    useEffect(() => {
        updatePage()
        

    }, [scrollRef])
    return (
        <>
        
            {!disabled ? <div style={{ margin: 0, padding: 0 }}>
                <h3 style={{ padding: "20px", marginBottom: '0', fontWeight: 'normal', fontSize: "40px" }}>{title}</h3>
                <div onMouseEnter={() => setBtn("flex")} onMouseLeave={() => setBtn("none")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    <div style={{ display: btnState, gap: "20px", flexWrap: "unset", overflow: "scroll", scrollbarWidth: "none" }} className={style.container_l}>
                        <button onClick={prev} className={style.previous} >
                            <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#ffff"></path> </g> </g></svg>
                        </button>
                    </div>
                    <div ref={scrollRef} style={{ overflowY: "hidden", display: "flex", gap: "40px", padding: "30px", flexWrap: "unset", overflowX: "scroll", scrollbarWidth: "none" }} className={style.scrollClass}>
                        {

                            
                            popularMoviesData != null && popularMoviesData != undefined ? popularMoviesData.results.map((obj) => (
                                <Cards item={itemRef} id={obj.id} key={obj.id} title={obj?.name || obj?.title}  bgImage={obj.poster_path}></Cards>
                            )) : null
                        }
                        {loading()}

                    </div>
                    <div className={style.container} style={{ display: btnState, gap: "20px", padding: "30px", flexWrap: "unset", }} >
                        <button onClick={next} className={style.next}>
                            <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#ffff"></path> </g> </g></svg>
                        </button>
                    </div>


                </div>


            </div> :null}
        </>
    )
}