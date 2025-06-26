import React, { useRef } from "react";
import { Link, useNavigate } from "react-router";

export default function Navbar({searching,updateSearch}){
    const navigate = useNavigate()
    async function search(){ 
        updateSearch(searching.current.value)        
    }
    return(
        <>
         <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 37px",userSelect:"none",background:"rgb(32 30 30 / 50%)",zIndex:"99"}}>
          <>
            <Link to="/" style={{textDecoration:"none",color:"white"}}>
          <h1 id='logo'>h<p>!</p>movies</h1></Link>


          
          <div style={{display:"flex",alignItems:"center",gap:"30px"}}>

          <button onClick={()=>{navigate('/')}} className="switchType" style={{height:"30px",width:"60px",border:"1px solid white",borderRadius:"10px"}}><span style={{color:"#ff7e7e"}}>M</span>ovies</button>
          <button onClick={()=>navigate('/tv')} className="switchType" style={{height:"30px",width:"60px",border:"1px solid white",borderRadius:"10px"}}><span style={{color:"#ff7e7e"}}>T</span>V</button>
          <div className="searchIn"  style={{ background:"#ff7e7e",borderRadius:"10px",display:'flex',alignItems:"center",justifyContent:"space-between"}}>
            <input onFocus={(e)=>{updateSearch(e.target.value)}} onChange={search} ref={searching}  id='searchBox' name='search' type="text" placeholder='Search [/]' />
            </div>
          </div>
          </>

        </nav>
        </>
    )

}