import React, { useRef, useEffect, useState } from "react"
import Navbar from "./Navbar"
import Cards from "./Cards"
import Skeleton from "./onLoad/Skeleton"

export default function Search({ options, searchValue, disabled = true }) {
    if (!disabled) {

        let [page, setPage] = useState(1)
        let [isLoading, setLoading] = useState(true)

        let [searchData, setSearchData] = useState(null)
        let cardRef = useRef()
        let [adult, setAdult] = useState("false")

        const [switcher, setSwticher] = useState("movie");
        
        const url = `https://api.themoviedb.org/3/search/${switcher}?query=${searchValue}&include_adult=${adult}&language=en-US&page=${page}`
        async function getSearchData() {
            let res = await fetch(url, options)
            res = await res.json()
            if (res.results.length > 0) {
                setSearchData(res)

            }
            else {
                setSearchData(null)
            }
        }

        async function loadSkeleton() {
            setLoading(true)

            await new Promise(r => setTimeout(r, 2500))
            setLoading(false)
        }

        useEffect(() => {
            if (window.location.pathname == "/tv") {
            setSwticher("tv")
        }
        else {
            setSwticher("movie")
        }
            const timer = setTimeout(() => {
                getSearchData()
                loadSkeleton()

            }, 1000);
            return (() => {
                clearTimeout(timer)
            })

        }, [searchValue])

        return (
            <>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", padding: "20px" }}>
                    {
                        searchData ? searchData.results.map((result) => (
                            
                                result.poster_path ? <Cards key={result.id} style={{ width: "100px" }} item={cardRef} title={result.title} id={result.id} bgImage={result.poster_path} /> : null
                        )) : <>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>Nothing <span style={{ color: "#ff7e7e" }}>
                                    Found...</span></h1>
                            </div>
                        </>
                    }
                </div>

            </>
        )
    }
}