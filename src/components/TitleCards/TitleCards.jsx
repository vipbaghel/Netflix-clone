import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'



const TitleCards = ({title,category}) => {
  
  const cardsRef =useRef();
  const [apiData,setApiData]=useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTQzMDZiYTk5ZTRhYWU1YzRlODI3NjEzYjllNTg5YiIsIm5iZiI6MTcyNzI4MzE3My41NTM5NDgsInN1YiI6IjY2ZjQzZTRiM2E5NWE1YmNkYTIzMGVmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3ZtUn-_SDXJ_vnJ5fUGVQh766LgenBnrXMQuxw3fQEM'
    }
  };
  
  

const handleWheel =(event)=>{
  event.preventDefault;
  cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel',handleWheel);
})


  return (
    <div className='title-cards'>
      <h2> 
        {title?title:'Popular on Netflix'}
      </h2>
      <div className='card-list' ref={cardsRef}>
       {
        apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}> 
           <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
           <p>{card.original_title}</p>
          </Link>
        })
       }
      </div>
       
       </div>
  )
}

export default TitleCards