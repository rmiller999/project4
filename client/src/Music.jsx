import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Music({user}) {
  const [musicList, setMusicList] = useState([])
  const [favorites, setFavorites] = useState([])
  const [musicId, setMusicId] = useState(1)

  const getMusicList = () => {
  
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/musicall').then(res => {
      // console.log('get result from backend', res.data)
      setMusicList(res.data._embedded.events)
      setMusicId(res.data._embedded.events.id)
      // this.setState(
      //   {attractionsList: res.data._embedded.events})
    } )
  }

  const addToFavorites = (event) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    const newFavs = [...favorites, musicList]
    axios.post(`users/${user._id}/events/`, {name: event.name, date: event.date}).then((response) => {
      axios.get(`users/${user._id}/events`).then((res) => {
        setFavorites(res.data)
      })
    })
  }

  useEffect(() => {
    getMusicList();
    axios.get(`users/${user._id}/events`).then((res) => {
      setFavorites(res.data)
    })
  },[])

  let content = musicList.map(event => {
    return (
      <div className='attractionsList'>
        <a href={event.url} target='_blank'>{event.name}</a>
        <button onClick={()=>addToFavorites(event)} type="submit">Add to Favorites</button>
      </div>
    )
  })

  let favoritesList;
  favoritesList = favorites.map((favorite,id)=>{
    return (
      <div>
        <p key={id}>{favorite.name}</p>
        {/* <button onClick={()=> deleteAFavorite(favorite)}>Remove Favorite</button> */}
      </div>
    )  
  })

  return (
    <div>
      {/* <button onClick={()=> this.getAttractionsList()}>Music</button> */}
      {content}
      {favoritesList}
    </div>
  )
}


export default Music;