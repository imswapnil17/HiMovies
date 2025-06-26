import React, { use, useEffect, useReducer, useRef, useState } from 'react'
import ScrollTrending from './ScrollTrending';

export default function TrendingBg({ title, url, options }) {
    const [popularMoviesData, setPopularMoviesData] = useState();
        let scrollRef = useRef()

    const [page, setPage] = useState(1)
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

    useState(() => {
        getInfo()
    }, [])
    async function scrollAbit(){
           if(scrollRef.current){
            await new Promise(r=>setTimeout(r,200));
            scrollRef.current.scrollTo({left:scrollRef.current.scrollLeft+scrollRef.current.getBoundingClientRect().width,behavior:"smooth"})
           }
    }
        
    setInterval(() => {
        scrollAbit()
    }, 5000);
    return (
        <>
            <div ref={scrollRef} className="scrollBg" style={{width:"100%",height:"800px",display:"flex",overflow:"hidden",alignItems:"center"}}>

                {
                    popularMoviesData ? popularMoviesData.results.map((ob) => {
                        return (
                            <ScrollTrending key={ob.id} id={ob.id} title={ob.title} bgImage={ob.backdrop_path} />
                        )
                    }) : null
                }
            </div>
        </>
    )

}