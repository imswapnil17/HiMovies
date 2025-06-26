import React, { use, useEffect, useRef, useState } from 'react'
import './App.css'
import { Outlet, Route, Routes } from 'react-router';
import Player from './Player';
import Home from './Home';


import Tv from './Tv'
import Info from './Info';
import GetEpisodes from './GetEpisodes';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGNkOGYwNThlMWZmOWViNTdiMjFhN2VkNDQzZjAzMyIsIm5iZiI6MTc1MDY4Njc3NS40NzQsInN1YiI6IjY4NTk1YzM3NGM3OGRiNmNiNjQ5MzgwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RF6yBjWc2WxTT5H-wEAELRp3d2V-UFsSb70AUmWhhhE'
  }
};
function App() {
  const [searchValue, updateSearch] = useState("")
  const searching = useRef()
  
  return (
    <>
      <Routes>
         <Route path='/movie/discover' element={<Outlet/>}>
          <Route path='vid/:id' element={<Player searching={searching} updateSearch={updateSearch} options={options} searchValue={searchValue} />}></Route>
          <Route path=':id' element={<Info options={options} searchValue={searchValue} updateSearch={updateSearch} />}></Route>
         </Route>
          

        <Route path='/' element={<Home  options={options} searchValue={searchValue} updateSearch={updateSearch} />}></Route>

        <Route path='' element={<Player />} />
        <Route path='/tv' element={<Tv options={options} searchValue={searchValue} updateSearch={updateSearch} />}>
        
        </Route>
        <Route path='/tv/discover'>
          <Route path=':id' element={<Info options={options} searchValue={searchValue} updateSearch={updateSearch} />}></Route>
          <Route path='episodes/:id' element={<GetEpisodes options={options}/>}></Route>

        </Route>

        <Route path='*' element={"404 NOT FOUND"} />

      </Routes>











    </>
  )

}

export default App
